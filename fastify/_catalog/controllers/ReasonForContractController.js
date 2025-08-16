// _catalog/controllers/ReasonForContractController.js
import { getAll } from '../models/ReasonForContract.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

export default async function ReasonForContractController(fastify) {
  fastify.get('/contract-reasons', {
    schema: {
      tags: ['Catalog'],
      summary: 'List reasons for contract start',
      response: { 200: ListResponseSchema, 500: ErrorSchema },
    },
  }, async () => ({ items: await getAll(fastify) }));
}
