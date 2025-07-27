import Fastify from 'fastify';
import dotenv from 'dotenv';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import authRoutes from './auth/routes/auth.js';
import dbPlugin from './auth/plugins/db.js';

dotenv.config();

const app = Fastify({ logger: true });

// ✅ سجل CORS أولاً
await app.register(fastifyCors, {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

// 📦 Swagger
await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'SlashHR API',
      version: '1.0.0'
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}` }]
  }
});

await app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: { docExpansion: 'list' },
  staticCSP: true
});

// 🔌 Plugins & routes
await app.register(dbPlugin);
await app.register(authRoutes, { prefix: '/auth' });

app.get('/', async () => ({ message: 'SlashHR API is running' }));

// 🚀 Start
try {
  const address = await app.listen({ port: process.env.PORT || 3000 });
  console.log(`🚀 Server running at ${address}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
