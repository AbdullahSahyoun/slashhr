import { createEmpTempController } from './controller.js';

export default async function routes(fastify) {
  // Match your desired endpoint exactly:
  fastify.post('/employees', {
    schema: {
      tags: ['Employee'],
      summary: 'Create user from template then employee',
      body: {
        type: 'object',
        required: ['name'],
        properties: { name: { type: 'string', minLength: 2 } }
      }
    }
  }, createEmpTempController);
}
