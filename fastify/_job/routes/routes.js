import { JobTitleController } from '../controllers/controller.js';

/* ========= Schemas ========= */
const jobTitleBody = {
  type: 'object',
  required: ['TenantID', 'title_name'],
  properties: {
    TenantID: { type: 'integer' },
    title_name: { type: 'string' },
    description: { type: 'string' },
    is_active: { type: 'boolean' },
  },
  additionalProperties: false,
};

const idParams = {
  type: 'object',
  properties: { id: { type: 'integer' } },
  required: ['id'],
};

const tenantParams = {
  type: 'object',
  properties: { tenantId: { type: 'integer' } },
  required: ['tenantId'],
};

const titleObj = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    TenantID: { type: 'integer' },
    title_name: { type: 'string' },
    description: { type: 'string', nullable: true },
    is_active: { type: 'boolean' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
  },
};

export default async function jobTitleRoutes(fastify) {
  const tags = ['Job Titles'];

  /* ===================== LISTS ===================== */

  // Primary: List all job titles by tenant
  fastify.get(
    '/tenant/:tenantId',
    {
      schema: {
        tags,
        params: tenantParams,
        response: { 200: { type: 'array', items: titleObj } },
      },
    },
    JobTitleController.listByTenant
  );

  // Alias
  fastify.get(
    '/list/:tenantId',
    {
      schema: {
        tags,
        params: tenantParams,
        response: { 200: { type: 'array', items: titleObj } },
      },
    },
    JobTitleController.listByTenant
  );

  // With employee counts
  fastify.get(
    '/tenant/:tenantId/with-counts',
    {
      schema: {
        tags,
        params: tenantParams,
        response: { 200: { type: 'array', items: { type: 'object' } } },
      },
    },
    JobTitleController.listWithCounts
  );

  /* ===================== SINGLE ===================== */

  // Primary: Get by id
  fastify.get(
    '/:id',
    {
      schema: {
        tags,
        params: idParams,
        response: { 200: titleObj, 404: { type: 'object' } },
      },
    },
    JobTitleController.getById
  );

  // Details (aliases)
  fastify.get(
    '/details/:id',
    {
      schema: {
        tags,
        params: idParams,
        response: { 200: titleObj, 404: { type: 'object' } },
      },
    },
    JobTitleController.getDetails
  );
  fastify.get(
    '/:id/details',
    {
      schema: {
        tags,
        params: idParams,
        response: { 200: titleObj, 404: { type: 'object' } },
      },
    },
    JobTitleController.getDetails
  );

  /* ===================== CREATE ===================== */

  // Primary
  fastify.post(
    '/',
    {
      schema: {
        tags,
        body: jobTitleBody,
        response: { 201: titleObj, 409: { type: 'object' } },
      },
    },
    JobTitleController.create
  );

  // Alias: /create
  fastify.post(
    '/create',
    {
      schema: {
        tags,
        body: jobTitleBody,
        response: { 201: titleObj, 409: { type: 'object' } },
      },
    },
    JobTitleController.create
  );

  /* ===================== UPDATE ===================== */

  // Primary
  fastify.patch(
    '/:id',
    {
      schema: {
        tags,
        params: idParams,
        body: {
          type: 'object',
          properties: {
            title_name: { type: 'string' },
            description: { type: 'string' },
            is_active: { type: 'boolean' },
          },
          additionalProperties: false,
        },
        response: { 200: titleObj, 404: { type: 'object' }, 409: { type: 'object' } },
      },
    },
    JobTitleController.update
  );

  // Alias: /update/:id
  fastify.patch(
    '/update/:id',
    {
      schema: {
        tags,
        params: idParams,
        body: {
          type: 'object',
          properties: {
            title_name: { type: 'string' },
            description: { type: 'string' },
            is_active: { type: 'boolean' },
          },
          additionalProperties: false,
        },
        response: { 200: titleObj, 404: { type: 'object' }, 409: { type: 'object' } },
      },
    },
    JobTitleController.update
  );

  /* ===================== DELETE ===================== */

  // Primary (RESTful): DELETE /:id
  fastify.delete(
    '/:id',
    {
      schema: {
        tags,
        params: idParams,
        response: { 200: { type: 'object' }, 404: { type: 'object' } },
      },
    },
    JobTitleController.remove
  );

  // Alias: /delete/:id (action in URL)
  fastify.delete(
    '/delete/:id',
    {
      schema: {
        tags,
        params: idParams,
        response: { 200: { type: 'object' }, 404: { type: 'object' } },
      },
    },
    JobTitleController.remove
  );
}
