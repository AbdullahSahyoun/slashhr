import { getAll } from '../models/SocioProfessionalCategory.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

function resolveTenantId(request) {
  return (
    request.user?.TenantID ??
    request.user?.tenantId ??
    request.user?.tenant_id ??
    (request.headers['x-tenant-id'] ? Number(request.headers['x-tenant-id']) : undefined) ??
    (request.query?.tenantId ? Number(request.query.tenantId) : undefined)
  );
}

export default async function SocioProfessionalCategoryController(fastify) {
  const maybeAuth = fastify.authenticate ? { preHandler: fastify.authenticate } : {};

  fastify.get('/socio-professional-categories', {
   
    schema: {
      tags: ['Catalog'],
      summary: 'List socio-professional categories (tenant scoped)',
      querystring: {
        type: 'object',
        properties: { tenantId: { type: 'integer' } } // fallback if no JWT
      },
      response: { 200: ListResponseSchema, 400: ErrorSchema, 500: ErrorSchema }
    }
  }, async (request, reply) => {
    const tenantId = resolveTenantId(request);
    if (!tenantId) {
      return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
    }
    try {
      const items = await getAll(fastify, Number(tenantId));
      return { items };
    } catch (err) {
      fastify.log.error({ err }, 'Failed to list socio-professional categories');
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });
}
