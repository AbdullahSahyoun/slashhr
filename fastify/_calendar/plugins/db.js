import fp from 'fastify-plugin';
import fastifyPostgres from 'fastify-postgres';
import dotenv from 'dotenv';
dotenv.config();

export default fp(async function (fastify) {
  fastify.register(fastifyPostgres, {
    connectionString: process.env.DATABASE_URL
  });
});
