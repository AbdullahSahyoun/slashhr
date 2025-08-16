// _catalog/controllers/SecondaryRolesController.js
import { getAll } from '../models/SecondaryRoles.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function SecondaryRolesController(fastify) {
  fastify.get('/roles/secondary', {
    schema: {
      tags: ['Catalog'],
      summary: 'List secondary roles',
      response: { 200: ListResponseSchema, 500: ErrorSchema },
    },
  }, async () => ({ items: await getAll(fastify) }));
}
