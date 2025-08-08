import * as EmployeeController from '../controllers/_EmployeeController.js';

/**
 * Employee Routes
 * 
 * Endpoints:
 * - GET    /employee/          → List all employees (authenticated)
 * - GET    /employee/:id       → Get employee by ID (authenticated)
 * - POST   /employee/          → Create a new employee (authenticated)
 * - PUT    /employee/:id       → Update an employee (authenticated)
 * - DELETE /employee/:id       → Delete an employee (authenticated)
 */
export default async function employeeRoutes(fastify, opts) {
  // ✅ Get all employees
  fastify.get('/', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'Get all employees',
      tags: ['Employee'],
            summary: 'Get all employees',

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

  // ✅ Get employee by ID
  fastify.get('/:id', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'Get a specific employee by ID',
      tags: ['Employee'],
                  summary: 'Get a specific employee by ID',

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
                        summary: 'Add a new employee',

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

  // ✅ Update employee by ID
  fastify.put('/:id', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'Update an employee by ID',
                              summary: 'Update an employee by ID',

      tags: ['Employee'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        },
        required: ['id']
      },
      body: {
        type: 'object',
        properties: {
          TenantID: { type: 'integer' },
          UserID: { type: ['integer', 'null'] },
          PositionID: { type: ['integer', 'null'] },
          OrgID: { type: ['integer', 'null'] },
          Name: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
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
  }, EmployeeController.update);

  // ✅ Delete employee by ID
  fastify.delete('/:id', {
    preValidation: [fastify.authenticate],
    schema: {
      description: 'Delete an employee by ID',
          summary: 'Delete an employee by ID',
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
            message: { type: 'string' }
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
  }, EmployeeController.remove);
}