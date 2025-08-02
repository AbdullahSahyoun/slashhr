import Fastify from 'fastify';
import dotenv from 'dotenv';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';

import authRoutes from './auth/routes/auth.js';
import dbPlugin from './auth/plugins/db.js';

dotenv.config();

const app = Fastify({ logger: true });

// ✅ Enable CORS
await app.register(fastifyCors, {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

// ✅ JWT Support
await app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecret123' // 🔐 Use strong secret in .env
});

// ✅ Add JWT decorator for protected routes
app.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.code(401).send({ error: 'Unauthorized' });
  }
});

// 📦 Swagger Docs
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

// 🔌 Plugins & Routes
await app.register(dbPlugin);
await app.register(authRoutes, { prefix: '/auth' });

// 🏠 Test route
app.get('/', async () => ({ message: 'SlashHR API is running' }));

// 🚀 Start server (publicly accessible)
try {
  const address = await app.listen({
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  });
  console.log(`🚀 Server running at ${address}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
