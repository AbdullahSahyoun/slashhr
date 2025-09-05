// _calendar/routes/routes.js
import fp from 'fastify-plugin';
import { CalendarController, EventController } from '../controllers/controllers.js';

const TAG = 'Calendar';

export default fp(async function calendarRoutes(fastify) {
  const auth = fastify.authenticate ? { preHandler: [fastify.authenticate] } : {};

  /* =========================
   * Calendars
   * ========================= */
  fastify.get('/calendars', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'List calendars',
      querystring: {
        type: 'object',
        properties: {
          tenantId: { type: 'integer' },
          q: { type: 'string', description: 'Search by name (ILIKE %q%)' },
        },
      },
    },
  }, CalendarController.list);

  fastify.get('/calendars/:id', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'Get calendar',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'integer' } } },
    },
  }, CalendarController.get);

  fastify.post('/calendars', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'Create calendar',
      body: {
        type: 'object',
        required: ['tenantId', 'name'],
        properties: {
          tenantId: { type: 'integer' },
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
        },
      },
    },
  }, CalendarController.create);

  fastify.put('/calendars/:id', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'Update calendar',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'integer' } } },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string', nullable: true },
        },
      },
    },
  }, CalendarController.update);

  fastify.delete('/calendars/:id', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'Delete calendar',
      params: { type: 'object', required: ['id'], properties: { id: { type: 'integer' } } },
    },
  }, CalendarController.remove);

  // List calendars linked to an organization
  fastify.get('/org/:orgId', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'List calendars by organization',
      params: { type: 'object', required: ['orgId'], properties: { orgId: { type: 'integer' } } },
    },
  }, CalendarController.listByOrg);

  // Link/unlink organization to calendar
  fastify.post('/org-link', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'Link organization to calendar',
      body: {
        type: 'object',
        required: ['orgId', 'calendarId'],
        properties: {
          orgId: { type: 'integer' },
          calendarId: { type: 'integer' },
        },
      },
    },
  }, CalendarController.linkOrg);

  fastify.delete('/org-link', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'Unlink organization from calendar',
      body: {
        type: 'object',
        required: ['orgId', 'calendarId'],
        properties: {
          orgId: { type: 'integer' },
          calendarId: { type: 'integer' },
        },
      },
    },
  }, CalendarController.unlinkOrg);

  /* =========================
   * Events
   * ========================= */
  fastify.get('/:calendarId/events', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'List events in a calendar',
      params: { type: 'object', required: ['calendarId'], properties: { calendarId: { type: 'integer' } } },
      querystring: {
        type: 'object',
        properties: {
          from: { type: 'string', format: 'date-time' },
          to: { type: 'string', format: 'date-time' },
          q: { type: 'string', description: 'Search in title' },
        },
      },
    },
  }, EventController.list);

  fastify.post('/:calendarId/events', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'Create event in a calendar',
      params: { type: 'object', required: ['calendarId'], properties: { calendarId: { type: 'integer' } } },
      body: {
        type: 'object',
        required: ['title', 'start', 'end'],
        properties: {
          title: { type: 'string' },
          start: { type: 'string', format: 'date-time' },
          end: { type: 'string', format: 'date-time' },
          description: { type: 'string', nullable: true },
        },
      },
    },
  }, EventController.create);

  fastify.get('/events/:eventId', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'Get event',
      params: { type: 'object', required: ['eventId'], properties: { eventId: { type: 'integer' } } },
    },
  }, EventController.get);

  fastify.put('/events/:eventId', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'Update event',
      params: { type: 'object', required: ['eventId'], properties: { eventId: { type: 'integer' } } },
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          start: { type: 'string', format: 'date-time' },
          end: { type: 'string', format: 'date-time' },
          description: { type: 'string', nullable: true },
        },
      },
    },
  }, EventController.update);

  fastify.delete('/events/:eventId', {
    ...auth,
    schema: {
      tags: [TAG],
      summary: 'Delete event',
      params: { type: 'object', required: ['eventId'], properties: { eventId: { type: 'integer' } } },
    },
  }, EventController.remove);
});
