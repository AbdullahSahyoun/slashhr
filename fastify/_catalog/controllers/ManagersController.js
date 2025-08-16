// _catalog/controllers/ManagersController.js
import { getAll } from '../models/Managers.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function ManagersController(fastify) {
  fastify.get('/managers', {
    schema: {
      tags: ['Catalog'],
      summary: 'List managers',
      response: { 200: ListResponseSchema, 500: ErrorSchema },
    },
  }, async () => ({ items: await getAll(fastify) }));
}
