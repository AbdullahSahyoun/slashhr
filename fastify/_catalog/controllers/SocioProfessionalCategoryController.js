// _catalog/controllers/SocioProfessionalCategoryController.js
import { getAll } from '../models/SocioProfessionalCategory.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function SocioProfessionalCategoryController(fastify) {
  fastify.get('/categories', {
    schema: {
      tags: ['Catalog'],
      summary: 'List socio‑professional categories',
      response: { 200: ListResponseSchema, 500: ErrorSchema },
    },
  }, async () => ({ items: await getAll(fastify) }));
}
