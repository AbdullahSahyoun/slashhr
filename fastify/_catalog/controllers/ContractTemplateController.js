// _catalog/controllers/ContractTemplateController.js
import { getAll } from '../models/ContractTemplate.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function ContractTemplateController(fastify) {
  fastify.get('/contract-templates', {
    schema: {
      tags: ['Catalog'],
      summary: 'List contract templates',
      response: { 200: ListResponseSchema, 500: ErrorSchema },
    },
  }, async () => ({ items: await getAll(fastify) }));
}
