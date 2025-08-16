// _catalog/controllers/LegalEntitiesController.js
import { getAll } from '../models/LegalEntities.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function LegalEntitiesController(fastify) {
  fastify.get('/legal-entities', {
    // onRequest: [fastify.authenticate], // ← enable if you want JWT protection
    schema: {
      tags: ['Catalog'],
      summary: 'List legal entities',
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
