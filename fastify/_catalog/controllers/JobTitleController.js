// _catalog/controllers/JobTitleController.js
import { getAll, getById, update, deactivate, deleteHard } from '../models/JobTitle.model.js';
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

export default async function JobTitleController(fastify) {
  const maybeAuth = fastify.authenticate ? { preHandler: fastify.authenticate } : {};

  // List all
  fastify.get(
    '/job-titles',
    {
     
      schema: {
        tags: ['Catalog'],
        summary: 'List job titles (scoped by tenant)',
        querystring: {
          type: 'object',
          properties: {
            q: { type: 'string' },
            active: { type: 'boolean' },
            limit: { type: 'integer', minimum: 1, maximum: 500, default: 100 },
            offset: { type: 'integer', minimum: 0, default: 0 },
            tenantId: { type: 'integer' } // fallback for dev/testing
          }
        },
        response: { 200: ListResponseSchema, 400: ErrorSchema, 500: ErrorSchema }
      }
    },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      const { q, active, limit, offset } = request.query || {};
      const items = await getAll(fastify, Number(tenantId), { q, active, limit, offset });
      return reply.send({ items });
    }
  );

  // Get by id
  fastify.get(
    '/job-titles/:id',
    {  schema: { tags: ['Catalog'], summary: 'Get job title by id', response: { 200: { type: 'object' }, 400: ErrorSchema, 404: ErrorSchema } } },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      const item = await getById(fastify, Number(tenantId), Number(request.params.id));
      if (!item) return reply.code(404).send({ error: 'Not Found', message: 'Job title not found' });
      return reply.send(item);
    }
  );

  // Update (rename / toggle active)
  fastify.patch(
    '/job-titles/:id',
    {
 
      schema: {
        tags: ['Catalog'],
        summary: 'Update job title',
        body: {
          type: 'object',
          properties: {
            title_name: { type: 'string' },
            is_active: { type: 'boolean' }
          }
        },
        response: { 200: { type: 'object' }, 400: ErrorSchema, 404: ErrorSchema }
      }
    },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      const item = await update(fastify, Number(tenantId), Number(request.params.id), request.body || {});
      if (!item) return reply.code(404).send({ error: 'Not Found', message: 'Job title not found' });
      return reply.send(item);
    }
  );

  // Soft delete (deactivate)
  fastify.delete(
    '/job-titles/:id',
    { schema: { tags: ['Catalog'], summary: 'Deactivate job title (soft delete)', response: { 200: { type: 'object' }, 400: ErrorSchema, 404: ErrorSchema } } },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      const item = await deactivate(fastify, Number(tenantId), Number(request.params.id));
      if (!item) return reply.code(404).send({ error: 'Not Found', message: 'Job title not found' });
      return reply.send(item);
    }
  );

  // Hard delete (permanent) — optional, disable if you only want soft delete
  fastify.delete(
    '/job-titles/:id/hard',
    { schema: { tags: ['Catalog'], summary: 'Permanently delete job title', response: { 200: { type: 'object' }, 400: ErrorSchema, 404: ErrorSchema } } },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      const deletedId = await deleteHard(fastify, Number(tenantId), Number(request.params.id));
      if (!deletedId) return reply.code(404).send({ error: 'Not Found', message: 'Job title not found' });
      return reply.send({ id: deletedId, deleted: true });
    }
  );
}
