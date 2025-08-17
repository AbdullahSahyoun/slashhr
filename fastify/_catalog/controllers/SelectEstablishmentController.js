// _catalog/controllers/SelectEstablishmentController.js
// Adjust the import path to where you put the model:
import { getAll } from '../models/SelectEstablishment.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function SelectEstablishmentController(fastify) {
  // If you want to enforce auth on this route and you registered fastifyJwt:
  const maybeAuth = fastify.authenticate ? { preHandler: fastify.authenticate } : {};

  fastify.get(
    '/establishments',
    {
     
      schema: {
        tags: ['Catalog'],
        summary: 'List establishments (scoped by tenant)',
        querystring: {
          type: 'object',
          properties: {
            q: { type: 'string' },
            active: { type: 'boolean' },
            limit: { type: 'integer', minimum: 1, maximum: 500, default: 100 },
            offset: { type: 'integer', minimum: 0, default: 0 },
            // For non-auth testing in dev; ignored if JWT has tenant
            tenantId: { type: 'integer' }
          }
        },
        response: {
          200: ListResponseSchema, // { items: [...] }
          400: ErrorSchema,
          500: ErrorSchema
        }
      }
    },
    async (request, reply) => {
      try {
        const tenantId =
          // Prefer JWT claims if present (support multiple casing styles)
          request.user?.TenantID ??
          request.user?.tenantId ??
          request.user?.tenant_id ??
          // fallbacks for local testing
          (request.headers['x-tenant-id'] ? Number(request.headers['x-tenant-id']) : undefined) ??
          (request.query?.tenantId ? Number(request.query.tenantId) : undefined);

        if (!tenantId || Number.isNaN(Number(tenantId))) {
          return reply.code(400).send({
            error: 'Bad Request',
            message:
              'Tenant ID is required. Provide it in JWT claims (preferred) or via x-tenant-id header / ?tenantId=... in dev.'
          });
        }

        // Load from DB (already filtered by tenant in the model)
        const items = await getAll(fastify, Number(tenantId));

        // Optional light in-memory filters/pagination (SQL-side is better if needed):
        const { q, active, limit = 100, offset = 0 } = request.query || {};
        let filtered = items;

        if (typeof active !== 'undefined') {
          const want = String(active).toLowerCase() === 'true';
          filtered = filtered.filter(x =>
            typeof x.is_active === 'boolean' ? x.is_active === want : true
          );
        }

        if (q && String(q).trim() !== '') {
          const needle = String(q).toLowerCase();
          filtered = filtered.filter(x => String(x.label || '').toLowerCase().includes(needle));
        }

        const start = Math.max(parseInt(offset, 10), 0);
        const take = Math.min(Math.max(parseInt(limit, 10), 1), 500);
        const paged = filtered.slice(start, start + take);

        return reply.code(200).send({ items: paged });
      } catch (err) {
        fastify.log.error({ err }, 'Failed to list establishments');
        return reply.code(500).send({
          error: 'Internal Server Error',
          message: 'Failed to list establishments'
        });
      }
    }
  );
}
