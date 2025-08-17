// _catalog/controllers/QualificationController.js
import {
  getAll,
  getById,
  create,
  update,
  deactivate
} from '../models/Qualification.model.js';
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

export default async function QualificationController(fastify) {
  const maybeAuth = fastify.authenticate ? { preHandler: fastify.authenticate } : {};

  // List
  fastify.get(
    '/qualifications',
    {
     
      schema: {
        tags: ['Catalog'],
        summary: 'List qualifications (scoped by tenant)',
        querystring: {
          type: 'object',
          properties: {
            q: { type: 'string' },
            active: { type: 'boolean' },
            limit: { type: 'integer', minimum: 1, maximum: 500, default: 100 },
            offset: { type: 'integer', minimum: 0, default: 0 },
            tenantId: { type: 'integer' } // dev fallback if no JWT
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

  // Get by ID
  fastify.get(
    '/qualifications/:id',
    {
     
      schema: {
        tags: ['Catalog'],
        summary: 'Get qualification by id',
        params: { type: 'object', properties: { id: { type: 'integer' } }, required: ['id'] },
        response: { 200: { type: 'object' }, 400: ErrorSchema, 404: ErrorSchema }
      }
    },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      const item = await getById(fastify, Number(tenantId), Number(request.params.id));
      if (!item) return reply.code(404).send({ error: 'Not Found', message: 'Qualification not found' });
      return reply.send(item);
    }
  );

  // Create
  fastify.post(
    '/qualifications',
    {
     
      schema: {
        tags: ['Catalog'],
        summary: 'Create qualification',
        body: {
          type: 'object',
          required: ['qualification_name'],
          properties: {
            qualification_name: { type: 'string', minLength: 1 }
          }
        },
        response: { 200: { type: 'object' }, 400: ErrorSchema, 409: ErrorSchema, 500: ErrorSchema }
      }
    },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      try {
        const item = await create(fastify, Number(tenantId), request.body.qualification_name);
        return reply.send(item);
      } catch (err) {
        if (err?.code === '23505') {
          return reply.code(409).send({ error: 'Conflict', message: 'Qualification already exists for this tenant' });
        }
        throw err;
      }
    }
  );

  // Update
  fastify.patch(
    '/qualifications/:id',
    {
     
      schema: {
        tags: ['Catalog'],
        summary: 'Update qualification',
        params: { type: 'object', properties: { id: { type: 'integer' } }, required: ['id'] },
        body: {
          type: 'object',
          properties: {
            qualification_name: { type: 'string' },
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
        const item = await update(
          fastify,
          Number(tenantId),
          Number(request.params.id),
          request.body || {}
        );
        if (!item) return reply.code(404).send({ error: 'Not Found', message: 'Qualification not found' });
        return reply.send(item);
      } catch (err) {
        if (err?.code === '23505') {
          return reply.code(409).send({ error: 'Conflict', message: 'Qualification already exists for this tenant' });
        }
        throw err;
      }
    }
  );

  // Deactivate (soft delete)
  fastify.delete(
    '/qualifications/:id',
    {
     
      schema: {
        tags: ['Catalog'],
        summary: 'Deactivate qualification',
        params: { type: 'object', properties: { id: { type: 'integer' } }, required: ['id'] },
        response: { 200: { type: 'object' }, 400: ErrorSchema, 404: ErrorSchema }
      }
    },
    async (request, reply) => {
      const tenantId = resolveTenantId(request);
      if (!tenantId) return reply.code(400).send({ error: 'Bad Request', message: 'Tenant ID is required' });
      const item = await deactivate(fastify, Number(tenantId), Number(request.params.id));
      if (!item) return reply.code(404).send({ error: 'Not Found', message: 'Qualification not found' });
      return reply.send(item);
    }
  );
}
