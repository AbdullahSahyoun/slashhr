// _catalog/controllers/JobTitleController.js
import { getAll } from '../models/JobTitle.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function JobTitleController(fastify) {
  fastify.get('/job-titles', {
    schema: {
      tags: ['Catalog'],
      summary: 'List job titles',
      response: { 200: ListResponseSchema, 500: ErrorSchema },
    },
  }, async () => ({ items: await getAll(fastify) }));
}
