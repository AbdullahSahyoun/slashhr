// _post/controllers/PostDeleteController.js
import { deletePost } from '../models/Post.model.js';

export default async function PostDeleteController(fastify) {
  fastify.delete('/posts/:id', {
    // onRequest: [fastify.authenticate], // enable if you want auth
    schema: {
      tags: ['Post'],
      summary: 'Delete a post by ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'integer' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            id: { type: 'integer' }
          }
        },
        404: { type: 'object', properties: { error: { type: 'string' } } }
      }
    }
  }, async (req, reply) => {
    const { id } = req.params;
    try {
      const deleted = await deletePost(fastify, id);
      if (!deleted) {
        return reply.code(404).send({ error: 'Post not found' });
      }
      return { success: true, id: deleted.id };
    } catch (e) {
      req.log.error(e);
      return reply.code(500).send({ error: 'Failed to delete post' });
    }
  });
}
