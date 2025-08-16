// _post/controllers/PostCreateController.js
import { createPost } from '../models/Post.model.js';
import { PostItemSchema, PostCreateBody, ErrorSchema } from '../schemas/index.js';

export default async function PostCreateController(fastify) {
  fastify.post('/posts', {
    // onRequest: [fastify.authenticate], // enable if you want auth
    schema: {
      tags: ['Post'],
      summary: 'Create a new post',
      body: PostCreateBody,
      response: {
        201: PostItemSchema,
        400: ErrorSchema
      }
    }
  }, async (req, reply) => {
    try {
      const post = await createPost(fastify, req.body);
      return reply.code(201).send(post);
    } catch (e) {
      req.log.error(e);
      return reply.code(400).send({ error: 'Failed to create post' });
    }
  });
}
