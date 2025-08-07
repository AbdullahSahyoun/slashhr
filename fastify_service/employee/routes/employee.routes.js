import * as EmployeeController from '../controllers/EmployeeController.js';

export default async function employeeRoutes(fastify, opts) {
  // ✅ Get all employees
  fastify.get('/', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'Get all employees',
      tags: ['Employee'],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              EmployeeID: { type: 'integer' },
              TenantID: { type: 'integer' },
              Name: { type: 'string' },
              CreatedAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
  }, EmployeeController.getAll);

  // ✅ Get employee by ID (fixed schema.params)
  fastify.get('/:id', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'Get a specific employee by ID',
      tags: ['Employee'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        },
        required: ['id']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            EmployeeID: { type: 'integer' },
            TenantID: { type: 'integer' },
            Name: { type: 'string' },
            CreatedAt: { type: 'string', format: 'date-time' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, EmployeeController.getById);

  // ✅ Add new employee
  fastify.post('/', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'Add a new employee',
      tags: ['Employee'],
      body: {
        type: 'object',
        required: ['TenantID', 'Name'],
        properties: {
          TenantID: { type: 'integer' },
          UserID: { type: ['integer', 'null'] },
          PositionID: { type: ['integer', 'null'] },
          OrgID: { type: ['integer', 'null'] },
          Name: { type: 'string' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            EmployeeID: { type: 'integer' }
          }
        }
      }
    }
  }, EmployeeController.create);
}
