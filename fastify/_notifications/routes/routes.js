// _notification/routes/routes.js
import * as ctrl from '../controllers/controllers.js';

export default async function notificationRoutes(fastify) {
  // List notifications by employee
  fastify.get(
    '/employee/:employeeId',
    {
      schema: {
        tags: ['Notification'],
        summary: 'List notifications by employee',
        params: {
          type: 'object',
          properties: { employeeId: { type: 'integer', examples: [12] } },
          required: ['employeeId'],
          additionalProperties: false
        },
        querystring: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['Unread', 'Read'], examples: ['Unread'] },
            limit: { type: 'integer', examples: [20] },
            offset: { type: 'integer', examples: [0] }
          },
          additionalProperties: false
        }
      }
    },
    (req, reply) => ctrl.listByEmployee(fastify, req, reply)
  );

  // Get single notification by id
  fastify.get(
    '/:id',
    {
      schema: {
        tags: ['Notification'],
        summary: 'Get notification by id',
        params: {
          type: 'object',
          properties: { id: { type: 'integer', examples: [5] } },
          required: ['id'],
          additionalProperties: false
        }
      }
    },
    (req, reply) => ctrl.getById(fastify, req, reply)
  );

  // Create notification for employee
  fastify.post(
    '/employee/:employeeId',
    {
      schema: {
        tags: ['Notification'],
        summary: 'Create a notification for an employee',
        params: {
          type: 'object',
          properties: { employeeId: { type: 'integer', examples: [12] } },
          required: ['employeeId'],
          additionalProperties: false
        },
        body: {
          type: 'object',
          required: ['tenantId', 'title', 'message'],
          properties: {
            tenantId: { type: 'integer', examples: [1] },
            title: { type: 'string', examples: ['Leave Approved'] },
            message: { type: 'string', examples: ['Your leave request has been approved.'] },
            relatedEntityType: { type: 'string', examples: ['Leave'] },
            relatedEntityID: { type: 'integer', examples: [1], nullable: true },
            status: { type: 'string', enum: ['Unread', 'Read'], examples: ['Unread'] }
          },
          additionalProperties: false
        }
      }
    },
    (req, reply) => ctrl.createForEmployee(fastify, req, reply)
  );

  // Mark notification as read
  fastify.patch(
    '/:id/read',
    {
      schema: {
        tags: ['Notification'],
        summary: 'Mark notification as read',
        params: {
          type: 'object',
          properties: { id: { type: 'integer', examples: [5] } },
          required: ['id'],
          additionalProperties: false
        }
      }
    },
    (req, reply) => ctrl.markAsRead(fastify, req, reply)
  );

  // Delete notification
  fastify.delete(
    '/:id',
    {
      schema: {
        tags: ['Notification'],
        summary: 'Delete notification by id',
        params: {
          type: 'object',
          properties: { id: { type: 'integer', examples: [5] } },
          required: ['id'],
          additionalProperties: false
        }
      }
    },
    (req, reply) => ctrl.deleteById(fastify, req, reply)
  );
}
