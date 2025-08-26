// server.js
import fs from 'fs';
import path from 'path';
import Fastify from 'fastify';
import dotenv from 'dotenv';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';

// Routes & plugins (keep file names/paths as-is)
import authRoutes from './_auth/routes/routes.js';
import dbPlugin from './_auth/plugins/db.js';
import employeeRoutes from './_employee/routes/routes.js';
import employeeCreateRoutes from './_employee/routes/create.js';
import catalogRoutes from './_catalog/routes/routes.js';
import postRoutes from './_post/routes/routes.js';
import createEmpTempRoutes from './_createEmpTemp/routes.js';
import leaveRoutes from './_leave/routes/routes.js';

dotenv.config();

/* ============================
   HTTPS (dev/local)
============================ */
const USE_HTTPS = String(process.env.HTTPS_ENABLE || '').toLowerCase() === 'true';
const DEFAULT_KEY = path.resolve('../certs/key.pem');
const DEFAULT_CERT = path.resolve('../certs/cert.pem');

const SSL_KEY_PATH = process.env.SSL_KEY_PATH || DEFAULT_KEY;
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || DEFAULT_CERT;

let httpsOptions;
if (USE_HTTPS) {
  try {
    httpsOptions = {
      key: fs.readFileSync(SSL_KEY_PATH),
      cert: fs.readFileSync(SSL_CERT_PATH),
    };
    console.log(` HTTPS enabled (key: ${SSL_KEY_PATH}, cert: ${SSL_CERT_PATH})`);
  } catch (e) {
    console.warn('⚠️ HTTPS requested but cert files missing/invalid. Falling back to HTTP. Reason:', e.message);
  }
}

/* ============================
   Fastify app
============================ */
const app = Fastify({
  logger: true,
  https: httpsOptions, // only set if certs loaded
  trustProxy: true,
});

/* ============================
   CORS
============================ */
const corsOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

await app.register(fastifyCors, {
  origin: corsOrigins.length ? corsOrigins : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});

/* ============================
   DB plugin (decorates fastify.pg)
============================ */
await app.register(dbPlugin);

/* ============================
   JWT
============================ */
await app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'supersecretkey',
});

// auth decorator for protected routes
app.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch {
    reply.code(401).send({ error: 'Unauthorized' });
  }
});

/* ============================
   Swagger / OpenAPI
============================ */
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';

// Derive protocol: explicit API_BASE_URL > HTTPS flag > http
const PROTO =
  process.env.API_BASE_URL?.startsWith('https://') ? 'https'
  : process.env.API_BASE_URL?.startsWith('http://') ? 'http'
  : httpsOptions ? 'https'
  : 'http';

const PUBLIC_HOST = process.env.PUBLIC_HOST || 'localhost';
const baseUrl = process.env.API_BASE_URL || `${PROTO}://${PUBLIC_HOST}:${PORT}`;

await app.register(fastifySwagger, {
  openapi: {
    info: { title: 'SlashHR API', version: '1.0.0' },
    servers: [{ url: baseUrl }],
    // Tag order & descriptions (so Swagger groups sections nicely)
    tags: [
      { name: 'Auth', description: 'Authentication & tokens' },
      { name: 'Employee', description: 'Employee management' },
      { name: 'Catalog', description: 'Catalog / reference data' },
      { name: 'Timeline', description: 'Posts / social timeline' },
      { name: 'Create-Temp', description: 'Temp user -> employee' },
      { name: 'Leave', description: 'Leave management' }, //  your Leave section
    ],
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

/* ============================
   Routes
============================ */
// If you want to protect any group, add { preHandler: [app.authenticate] } as the 2nd arg.

await app.register(authRoutes,            { prefix: '/auth' });                 // tags: add inside route schemas as 'Auth'
await app.register(employeeRoutes,        { prefix: '/employee' });             // 'Employee'
await app.register(employeeCreateRoutes,  { prefix: '/employee' });             // 'Employee' (create)
await app.register(catalogRoutes,         { prefix: '/catalog' });              // 'Catalog'
await app.register(postRoutes,            { prefix: '/timeline' });             // 'Timeline'
await app.register(createEmpTempRoutes,   { prefix: '/api/create-temp' });      // 'Create-Temp'
await app.register(leaveRoutes,           { prefix: '/leaves' });               // 'Leave' — ensure each route has schema.tags=['Leave']

/* ============================
   Health / Root
============================ */
app.get('/health', async () => ({ status: 'ok', uptime: process.uptime() }));
app.get('/', async () => ({ message: 'SlashHR API is running' }));

/* ============================
   Start & graceful shutdown
============================ */
const start = async () => {
  try {
    const address = await app.listen({ port: PORT, host: HOST });
    app.log.info(` Server running at ${address} | Docs at ${address}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

const close = async () => {
  try {
    app.log.info('Shutting down...');
    await app.close();
    process.exit(0);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

process.on('SIGTERM', close);
process.on('SIGINT', close);

await start();
