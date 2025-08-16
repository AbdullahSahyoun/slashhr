// _post/controllers/PostController.js
import { listPosts } from '../models/Post.model.js';

const PostItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },        // change to string if you use UUIDs
    slug: { type: 'string' },
    title: { type: 'string' },
    excerpt: { type: 'string', nullable: true },
    coverUrl: { type: 'string', nullable: true },
    status: { type: 'string' },     // e.g., draft|published|archived
    authorId: { type: 'integer' },
    publishedAt: { type: 'string', nullable: true },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  }
};

const MetaSchema = {
  type: 'object',
  properties: {
    page: { type: 'integer' },
    limit: { type: 'integer' },
    total: { type: 'integer' },
    pages: { type: 'integer' },
  }
};

const ListResponseSchema = {
  type: 'object',
  properties: {
    items: { type: 'array', items: PostItemSchema },
    meta: MetaSchema
  }
};

const ErrorSchema = { type: 'object', properties: { error: { type: 'string' } } };

export default async function PostController(fastify) {
  fastify.get('/posts', {
    // onRequest: [fastify.authenticate], // uncomment if protected
    schema: {
      tags: ['Post'],
      summary: 'List posts (with pagination & search)',
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1, default: 1 },
          limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
          search: { type: 'string' },
          status: { type: 'string' }, // e.g. published
        }
      },
      response: {
        200: ListResponseSchema,
        500: ErrorSchema,
      }
    }
  }, async (req, reply) => {
    try {
      const data = await listPosts(fastify, req.query || {});
      return data;
    } catch (e) {
      req.log.error(e);
      return reply.code(500).send({ error: 'Failed to list posts' });
    }
  });
}
