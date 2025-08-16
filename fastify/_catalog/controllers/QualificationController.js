// _catalog/controllers/QualificationController.js
import { getAll } from '../models/Qualification.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function QualificationController(fastify) {
  fastify.get('/qualifications', {
    schema: {
      tags: ['Catalog'],
      summary: 'List qualifications',
      response: { 200: ListResponseSchema, 500: ErrorSchema },
    },
  }, async () => ({ items: await getAll(fastify) }));
}
