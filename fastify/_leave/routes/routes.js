// _leave/routes/routes.js
import * as ctrl from '../controllers/controllers.js';

export default async function leaveRoutes(fastify) {
  fastify.get('/tenant/:tenantId',
    { schema: { tags: ['Leave'], summary: 'List leaves by tenant' } },
    (req, reply) => ctrl.listByTenant(fastify, req, reply)
  );

  fastify.get('/employee/:employeeId',
    { schema: { tags: ['Leave'], summary: 'List leaves by employee' } },
    (req, reply) => ctrl.listByEmployee(fastify, req, reply)
  );

  fastify.get('/getbyid:id',
    { schema: { tags: ['Leave'], summary: 'Get leave by id' } },
    (req, reply) => ctrl.get(fastify, req, reply)
  );

 // router.js
fastify.post(
  '/create',
  {
    schema: {
      tags: ['Leave'],
      summary: 'Create a leave',
      body: {
        type: 'object',
        required: ['TenantID', 'EmployeeID', 'StartTime', 'EndTime'],
        properties: {
          TenantID:   { type: 'integer', examples: [1] },
          EmployeeID: { type: 'integer', examples: [12] },
          StartTime:  { type: 'string', format: 'date-time', examples: ['2025-09-01T09:00:00Z'] },
          EndTime:    { type: 'string', format: 'date-time', examples: ['2025-09-01T17:00:00Z'] },
          Purpose:    { type: 'string',  examples: ['Medical Appointment'] },
          Status:     { type: 'string',  enum: ['Pending', 'Approved', 'Rejected'] }
        },
        additionalProperties: false
      },
      response: {
        200: {
          description: 'Leave created successfully',
          type: 'object',
          properties: {
            LeaveID:    { type: 'integer' },
            TenantID:   { type: 'integer' },
            EmployeeID: { type: 'integer' },
            StartTime:  { type: 'string', format: 'date-time' },
            EndTime:    { type: 'string', format: 'date-time' },
            Purpose:    { type: 'string', nullable: true },
            Status:     { type: 'string' },
            CreatedAt:  { type: 'string', format: 'date-time' }
          },
          required: ['LeaveID','TenantID','EmployeeID','StartTime','EndTime','Status','CreatedAt'],
          additionalProperties: false
        },
        400: {
          description: 'Validation error',
          type: 'object',
          properties: { message: { type: 'string' } },
          required: ['message'],
          additionalProperties: false
        }
      }
    }
  },
  (req, reply) => ctrl.create(fastify, req, reply)
);

 // routes.js
fastify.patch(
  '/update/:id',
  {
    schema: {
      tags: ['Leave'],
      summary: 'Update leave status by id',
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer', examples: [3] }
        },
        required: ['id'],
        additionalProperties: false
      },
      body: {
        type: 'object',
        properties: {
          Status: { type: 'string', enum: ['Pending', 'Approved', 'Rejected'], examples: ['Approved'] }
        },
        required: ['Status'],
        additionalProperties: false
      },
      response: {
        200: {
          description: 'Leave updated successfully',
          type: 'object',
          properties: {
            LeaveID:    { type: 'integer' },
            TenantID:   { type: 'integer' },
            EmployeeID: { type: 'integer' },
            StartTime:  { type: 'string', format: 'date-time' },
            EndTime:    { type: 'string', format: 'date-time' },
            Purpose:    { type: 'string', nullable: true },
            Status:     { type: 'string' },
            CreatedAt:  { type: 'string', format: 'date-time' }
          },
          required: ['LeaveID','TenantID','EmployeeID','StartTime','EndTime','Status','CreatedAt'],
          additionalProperties: false
        },
        400: {
          description: 'Validation error',
          type: 'object',
          properties: { message: { type: 'string' } },
          required: ['message'],
          additionalProperties: false
        },
        404: {
          description: 'Leave not found',
          type: 'object',
          properties: { message: { type: 'string' } },
          required: ['message'],
          additionalProperties: false
        }
      }
    }
  },
  (req, reply) => ctrl.update(fastify, req, reply)
);

  fastify.delete('/delete/:id',
    { schema: { tags: ['Leave'], summary: 'Delete leave by id' } },
    (req, reply) => ctrl.remove(fastify, req, reply)
  );
  
}
