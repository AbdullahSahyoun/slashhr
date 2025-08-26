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

  fastify.get('/:id',
    { schema: { tags: ['Leave'], summary: 'Get leave by id' } },
    (req, reply) => ctrl.get(fastify, req, reply)
  );

  fastify.post('/',
    { schema: { tags: ['Leave'], summary: 'Create a leave' } },
    (req, reply) => ctrl.create(fastify, req, reply)
  );

  fastify.patch('/:id',
    { schema: { tags: ['Leave'], summary: 'Update leave by id' } },
    (req, reply) => ctrl.update(fastify, req, reply)
  );

  fastify.delete('/:id',
    { schema: { tags: ['Leave'], summary: 'Delete leave by id' } },
    (req, reply) => ctrl.remove(fastify, req, reply)
  );
  
}
