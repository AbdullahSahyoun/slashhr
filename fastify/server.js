import fs from 'fs';
import path from 'path';
import Fastify from 'fastify';
import dotenv from 'dotenv';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';

import authRoutes from './_auth/routes/routes.js';
import dbPlugin from './_auth/plugins/db.js';
import employeeRoutes from './_employee/routes/routes.js';
import employeeCreateRoutes from './_employee/routes/create.js';
import catalogRoutes from './_catalog/routes/routes.js';
import postRoutes from './_post/routes/routes.js';

dotenv.config();

/** ===== HTTPS (dev/local) ===== */
const USE_HTTPS = String(process.env.HTTPS_ENABLE || '').toLowerCase() === 'true';
const DEFAULT_KEY = path.resolve('../certs/key.pem');
const DEFAULT_CERT = path.resolve('../certs/cert.pem');

const SSL_KEY_PATH = process.env.SSL_KEY_PATH || DEFAULT_KEY;
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || DEFAULT_CERT;

let httpsOptions = undefined;
if (USE_HTTPS) {
  try {
    httpsOptions = {
      key: fs.readFileSync(SSL_KEY_PATH),
      cert: fs.readFileSync(SSL_CERT_PATH),
    };
    console.log(`🔐 HTTPS enabled (key: ${SSL_KEY_PATH}, cert: ${SSL_CERT_PATH})`);
  } catch (e) {
    console.warn(
      '⚠️  HTTPS requested but cert files not found/invalid. Falling back to HTTP.',
      e.message
    );
  }
}

/** ===== Fastify app ===== */
const app = Fastify({
  logger: true,
  https: httpsOptions, // only set when files load
  trustProxy: true,    // good practice if ever behind a proxy
});

/** ===== CORS ===== */
const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

await app.register(fastifyCors, {
  origin: corsOrigins.length ? corsOrigins : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

/** ===== DB plugin ===== */
await app.register(dbPlugin);

/** ===== JWT ===== */
await app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecretkey',
});

/** ===== Auth decorator ===== */
app.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch {
    reply.code(401).send({ error: 'Unauthorized' });
  }
});

/** ===== Swagger ===== */
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const PROTO =
  process.env.API_BASE_URL?.startsWith('https://')
    ? 'https'
    : process.env.API_BASE_URL?.startsWith('http://')
    ? 'http'
    : httpsOptions
    ? 'https'
    : 'http';

const PUBLIC_HOST = process.env.PUBLIC_HOST || 'localhost';
const baseUrl = process.env.API_BASE_URL || `${PROTO}://${PUBLIC_HOST}:${PORT}`;

await app.register(fastifySwagger, {
  openapi: {
    info: { title: 'SlashHR API', version: '1.0.0' },
    servers: [{ url: baseUrl }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
    security: [{ bearerAuth: [] }],
  },
});

await app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  exposeRoute: true,
  uiConfig: { docExpansion: 'list', deepLinking: true },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

/** ===== Routes ===== */
await app.register(authRoutes, { prefix: '/auth' });
await app.register(employeeRoutes, { prefix: '/employee' });
await app.register(employeeCreateRoutes, { prefix: '/employee' }); // <-- add employee POST
await app.register(catalogRoutes, { prefix: '/catalog' });
await app.register(postRoutes, { prefix: '/timeline' });

/** ===== Health ===== */
app.get('/', async () => ({ message: 'SlashHR API is running' }));

/** ===== Start ===== */
try {
  const address = await app.listen({ port: PORT, host: HOST });
  app.log.info(`🚀 Server running at ${address} | Docs at ${address}/docs`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
