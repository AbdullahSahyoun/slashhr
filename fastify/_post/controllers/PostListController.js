// _post/controllers/PostListController.js
import { listPosts } from '../models/Post.model.js';
import { ListResponseSchema, ErrorSchema } from '../schemas/index.js';

export default async function PostListController(fastify) {
  fastify.get('/posts', {
    // onRequest: [fastify.authenticate], // enable if you want auth
    schema: {
      tags: ['Post'],
      summary: 'List posts (with pagination & search)',
      querystring: {
        type: 'object',
        properties: {
          page:  { type: 'integer', minimum: 1, default: 1 },
          limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
          search:{ type: 'string' },
          status:{ type: 'string' } // e.g. published
        }
      },
      response: {
        200: ListResponseSchema,
        500: ErrorSchema,
      }
    }
  }, async (req, reply) => {
    try {
      return await listPosts(fastify, req.query || {});
    } catch (e) {
      req.log.error(e);
      return reply.code(500).send({ error: 'Failed to list posts' });
    }
  });
}
