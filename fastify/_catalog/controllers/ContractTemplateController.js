// _catalog/controllers/ContractTemplateController.js
import { getAll, getById, create, update, deactivate } from '../models/contractTemplates.model.js';
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

export default async function ContractTemplateController(fastify) {
  const maybeAuth = fastify.authenticate ? { preHandler: fastify.authenticate } : {};

  // List
  fastify.get(
    '/contract-templates',
    {
   
      schema: {
        tags: ['Catalog'],
        summary: 'List contract templates (scoped by tenant)',
        querystring: {
          type: 'object',
          properties: {
            q: { type: 'string' },
            active: { type: 'boolean' },
            limit: { type: 'integer', minimum: 1, maximum: 500, default: 100 },
            offset: { type: 'integer', minimum: 0, default: 0 },
            tenantId: { type: 'integer' } // dev fallback
          }
        },
        response: { 200: ListResponseSchema, 400: ErrorSchema, 500: ErrorSchema }
      }
    },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) {
        return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      }
      const { q, active, limit, offset } = request.query || {};
      const items = await getAll(fastify, Number(tenantId), { q, active, limit, offset });
      return reply.send({ items });
    }
  );

  // Get by id
  fastify.get(
    '/contract-templates/:id',
    { ...maybeAuth, schema: { tags: ['Catalog'], summary: 'Get contract template by id', response: { 200: { type: 'object' }, 400: ErrorSchema, 404: ErrorSchema } } },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      const item = await getById(fastify, Number(tenantId), Number(request.params.id));
      if (!item) return reply.code(404).send({ error: 'Not Found', message: 'Template not found' });
      return reply.send(item);
    }
  );

  // Create
  fastify.post(
    '/contract-templates',
    {
     
      schema: {
        tags: ['Catalog'],
        summary: 'Create contract template',
        body: {
          type: 'object',
          required: ['template_name'],
          properties: {
            template_name: { type: 'string', minLength: 1 },
            description: { type: 'string' },
            content: { type: 'string' }
          }
        },
        response: { 200: { type: 'object' }, 400: ErrorSchema, 409: ErrorSchema, 500: ErrorSchema }
      }
    },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      try {
        const item = await create(fastify, Number(tenantId), request.body);
        return reply.send(item);
      } catch (err) {
        if (err?.code === '23505') {
          return reply.code(409).send({ error: 'Conflict', message: 'Template name already exists for this tenant' });
        }
        throw err;
      }
    }
  );

  // Update (name/description/content/active)
  fastify.patch(
    '/contract-templates/:id',
    {
     
      schema: {
        tags: ['Catalog'],
        summary: 'Update contract template',
        body: {
          type: 'object',
          properties: {
            template_name: { type: 'string' },
            description: { type: 'string' },
            content: { type: 'string' },
            is_active: { type: 'boolean' }
          }
        },
        response: { 200: { type: 'object' }, 400: ErrorSchema, 404: ErrorSchema, 409: ErrorSchema }
      }
    },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      try {
        const item = await update(fastify, Number(tenantId), Number(request.params.id), request.body || {});
        if (!item) return reply.code(404).send({ error: 'Not Found', message: 'Template not found' });
        return reply.send(item);
      } catch (err) {
        if (err?.code === '23505') {
          return reply.code(409).send({ error: 'Conflict', message: 'Template name already exists for this tenant' });
        }
        throw err;
      }
    }
  );

  // Deactivate
  fastify.delete(
    '/contract-templates/:id',
    { ...maybeAuth, schema: { tags: ['Catalog'], summary: 'Deactivate contract template', response: { 200: { type: 'object' }, 400: ErrorSchema, 404: ErrorSchema } } },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      const item = await deactivate(fastify, Number(tenantId), Number(request.params.id));
      if (!item) return reply.code(404).send({ error: 'Not Found', message: 'Template not found' });
      return reply.send(item);
    }
  );
}
