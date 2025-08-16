// _catalog/controllers/DepartmentController.js
import { getAll } from '../models/Department.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function DepartmentController(fastify) {
  fastify.get('/departments', {
    schema: {
      tags: ['Catalog'],
      summary: 'List departments',
      response: { 200: ListResponseSchema, 500: ErrorSchema },
    },
  }, async () => ({ items: await getAll(fastify) }));
}
