import Fastify from 'fastify';
import dotenv from 'dotenv';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';

import authRoutes from './_auth/routes/rutes.js';
import dbPlugin from './_auth/plugins/db.js';
import employeeRoutes from './_employee/routes/routes.js';

dotenv.config();

const app = Fastify({ logger: true });

// ✅ CORS
await app.register(fastifyCors, {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});

// ✅ DB plugin (adds app.pg and/or req.pg)
await app.register(dbPlugin);

// ✅ JWT
await app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecretkey'
});

// ✅ Auth decorator
app.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch {
    reply.code(401).send({ error: 'Unauthorized' });
  }
});

// ✅ Swagger
await app.register(fastifySwagger, {
  openapi: {
    info: { title: 'SlashHR API', version: '1.0.0' },
    servers: [
      {
        url:
          process.env.API_BASE_URL ||
          `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      }
    },
    security: [{ bearerAuth: [] }]
  }
});

await app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  exposeRoute: true,
  uiConfig: { docExpansion: 'list', deepLinking: true },
  staticCSP: true,
  transformStaticCSP: (header) => header
});

// ✅ Shared schema (must be before routes)
 
// ✅ Routes
await app.register(authRoutes, { prefix: '/auth' });
await app.register(employeeRoutes, { prefix: '/employee' });

// ✅ Health check
app.get('/', async () => {
  return { message: 'SlashHR API is running' };
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

try {
  const address = await app.listen({ port: PORT, host: HOST });
  app.log.info(`🚀 Server running at ${address} | Docs at ${address}/docs`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
