// _catalog/controllers/SelectEstablishmentController.js
import { getAll } from '../models/SelectEstablishment.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function SelectEstablishmentController(fastify) {
  fastify.get('/establishments', {
    schema: {
      tags: ['Catalog'],
      summary: 'List establishments',
      response: {
        200: ListResponseSchema,
        500: ErrorSchema,
      },
    },
  }, async () => {
    const items = await getAll(fastify);
    return { items };
  });
}
