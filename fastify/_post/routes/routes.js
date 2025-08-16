import PostListController from '../controllers/PostListController.js';
import PostCreateController from '../controllers/PostCreateController.js';
import PostDeleteController from '../controllers/PostDeleteController.js';

export default async function postRoutes(fastify) {
  await fastify.register(PostListController);
  await fastify.register(PostCreateController);
  await fastify.register(PostDeleteController);
}
