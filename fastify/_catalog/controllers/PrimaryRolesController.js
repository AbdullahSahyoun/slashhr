// _catalog/controllers/PrimaryRolesController.js
import { getAll } from '../models/PrimaryRoles.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function PrimaryRolesController(fastify) {
  fastify.get('/roles/primary', {
    schema: {
      tags: ['Catalog'],
      summary: 'List primary roles',
      response: { 200: ListResponseSchema, 500: ErrorSchema },
    },
  }, async () => ({ items: await getAll(fastify) }));
}
