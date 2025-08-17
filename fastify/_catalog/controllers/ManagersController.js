// _catalog/controllers/DepartmentManagersController.js
import { getByDepartmentId } from '../models/Managers.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function DepartmentManagersController(fastify) {
  fastify.get('/departments/:id/managers', {
    schema: {
      tags: ['Catalog'],
      summary: 'List managers for a department (by DepartmentID)',
      params: { type: 'object', properties: { id: { type: 'integer' } }, required: ['id'] },
      response: { 200: ListResponseSchema, 500: ErrorSchema }
    }
  }, async (request, reply) => {
    try {
      const deptId = Number(request.params.id);
      const rows = await getByDepartmentId(fastify, deptId);
      // map name->label if your model still returns { id, name }
      const items = rows.map(r => ({ id: r.id, label: r.label ?? r.name }));
      return { items };
    } catch (err) {
      fastify.log.error({ err }, 'departments/:id/managers failed');
      return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });
}
