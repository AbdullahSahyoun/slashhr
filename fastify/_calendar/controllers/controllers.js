// _calendar/controllers/controllers.js
// Fastify route handlers for Calendar module

import {
  CalendarModel,
  EventModel,
  OrgCalendarModel,
} from '../models/models.js';

 
const ok = (reply, data, code = 200) => reply.code(code).send({ ok: true, data });
const err = (reply, code, message) => reply.code(code).send({ ok: false, message });

/* ================================
 * CALENDARS
 * ================================ */
export const CalendarController = {
  // GET /calendar/calendars?tenantId=&q=
  async list(request, reply) {
    try {
      const { tenantId, q } = request.query || {};
      const rows = await CalendarModel.list(request.server.pg, {
        tenantId: tenantId != null ? Number(tenantId) : null,
        q: q || undefined,
      });
      return ok(reply, rows);
    } catch (e) {
      request.log.error(e, 'Calendar list failed');
      return err(reply, 500, 'Failed to list calendars');
    }
  },

  // GET /calendar/calendars/:id
  async get(request, reply) {
    try {
      const id = Number(request.params.id);
      if (!id) return err(reply, 400, 'Invalid calendar id');
      const row = await CalendarModel.getById(request.server.pg, id);
      if (!row) return err(reply, 404, 'Calendar not found');
      return ok(reply, row);
    } catch (e) {
      request.log.error(e, 'Calendar get failed');
      return err(reply, 500, 'Failed to get calendar');
    }
  },

  // POST /calendar/calendars
  // body: { tenantId:number, name:string, description?:string }
  async create(request, reply) {
    try {
      const { tenantId, name, description } = request.body || {};
      if (!tenantId || !name) return err(reply, 400, 'tenantId and name are required');
      const row = await CalendarModel.create(request.server.pg, {
        tenantId: Number(tenantId),
        name: String(name),
        description: description ?? null,
      });
      return ok(reply, row, 201);
    } catch (e) {
      request.log.error(e, 'Calendar create failed');
      return err(reply, 500, 'Failed to create calendar');
    }
  },

  // PUT /calendar/calendars/:id
  async update(request, reply) {
    try {
      const id = Number(request.params.id);
      if (!id) return err(reply, 400, 'Invalid calendar id');
      const { name, description } = request.body || {};
      const row = await CalendarModel.update(request.server.pg, id, {
        name: name ?? null,
        description: description ?? null,
      });
      if (!row) return err(reply, 404, 'Calendar not found');
      return ok(reply, row);
    } catch (e) {
      request.log.error(e, 'Calendar update failed');
      return err(reply, 500, 'Failed to update calendar');
    }
  },

  // DELETE /calendar/calendars/:id
  async remove(request, reply) {
    try {
      const id = Number(request.params.id);
      if (!id) return err(reply, 400, 'Invalid calendar id');
      const out = await CalendarModel.remove(request.server.pg, id);
      return ok(reply, out);
    } catch (e) {
      request.log.error(e, 'Calendar delete failed');
      return err(reply, 500, 'Failed to delete calendar');
    }
  },

  // GET /calendar/org/:orgId
  async listByOrg(request, reply) {
    try {
      const orgId = Number(request.params.orgId);
      if (!orgId) return err(reply, 400, 'Invalid org id');
      const rows = await CalendarModel.listByOrg(request.server.pg, orgId);
      return ok(reply, rows);
    } catch (e) {
      request.log.error(e, 'Calendar listByOrg failed');
      return err(reply, 500, 'Failed to list org calendars');
    }
  },

  // POST /calendar/org-link
  // body: { orgId:number, calendarId:number }
  async linkOrg(request, reply) {
    try {
      const { orgId, calendarId } = request.body || {};
      if (!orgId || !calendarId) return err(reply, 400, 'orgId and calendarId are required');
      const row = await OrgCalendarModel.link(request.server.pg, {
        orgId: Number(orgId),
        calendarId: Number(calendarId),
      });
      return ok(reply, row, 201);
    } catch (e) {
      request.log.error(e, 'Org link failed');
      return err(reply, 500, 'Failed to link org to calendar');
    }
  },

  // DELETE /calendar/org-link
  // body: { orgId:number, calendarId:number }
  async unlinkOrg(request, reply) {
    try {
      const { orgId, calendarId } = request.body || {};
      if (!orgId || !calendarId) return err(reply, 400, 'orgId and calendarId are required');
      const out = await OrgCalendarModel.unlink(request.server.pg, {
        orgId: Number(orgId),
        calendarId: Number(calendarId),
      });
      return ok(reply, out);
    } catch (e) {
      request.log.error(e, 'Org unlink failed');
      return err(reply, 500, 'Failed to unlink org from calendar');
    }
  },
};

/* ================================
 * EVENTS
 * ================================ */
export const EventController = {
  // GET /calendar/:calendarId/events?from=&to=&q=
  async list(request, reply) {
    try {
      const { calendarId } = request.params;
      const { from, to, q } = request.query || {};
      const cid = Number(calendarId);
      if (!cid) return err(reply, 400, 'Invalid calendar id');

      const rows = await EventModel.list(request.server.pg, {
        calendarId: cid,
        from: from || undefined,
        to: to || undefined,
        q: q || undefined,
      });
      return ok(reply, rows);
    } catch (e) {
      request.log.error(e, 'Event list failed');
      return err(reply, 500, 'Failed to list events');
    }
  },

  // GET /calendar/events/:eventId
  async get(request, reply) {
    try {
      const eventId = Number(request.params.eventId);
      if (!eventId) return err(reply, 400, 'Invalid event id');
      const row = await EventModel.getById(request.server.pg, eventId);
      if (!row) return err(reply, 404, 'Event not found');
      return ok(reply, row);
    } catch (e) {
      request.log.error(e, 'Event get failed');
      return err(reply, 500, 'Failed to get event');
    }
  },

  // POST /calendar/:calendarId/events
  // body: { title:string, start:string, end:string, description?:string }
  async create(request, reply) {
    try {
      const cid = Number(request.params.calendarId);
      if (!cid) return err(reply, 400, 'Invalid calendar id');

      const { title, start, end, description } = request.body || {};
      if (!title || !start || !end) {
        return err(reply, 400, 'title, start and end are required');
      }

      const row = await EventModel.create(request.server.pg, {
        calendarId: cid,
        title: String(title),
        start: String(start),
        end: String(end),
        description: description ?? null,
      });
      return ok(reply, row, 201);
    } catch (e) {
      request.log.error(e, 'Event create failed');
      return err(reply, 500, 'Failed to create event');
    }
  },

  // PUT /calendar/events/:eventId
  async update(request, reply) {
    try {
      const eventId = Number(request.params.eventId);
      if (!eventId) return err(reply, 400, 'Invalid event id');

      const { title, start, end, description } = request.body || {};
      const row = await EventModel.update(request.server.pg, eventId, {
        title: title ?? null,
        start: start ?? null,
        end: end ?? null,
        description: description ?? null,
      });
      if (!row) return err(reply, 404, 'Event not found');
      return ok(reply, row);
    } catch (e) {
      request.log.error(e, 'Event update failed');
      return err(reply, 500, 'Failed to update event');
    }
  },

  // DELETE /calendar/events/:eventId
  async remove(request, reply) {
    try {
      const eventId = Number(request.params.eventId);
      if (!eventId) return err(reply, 400, 'Invalid event id');
      const out = await EventModel.remove(request.server.pg, eventId);
      return ok(reply, out);
    } catch (e) {
      request.log.error(e, 'Event delete failed');
      return err(reply, 500, 'Failed to delete event');
    }
  },
};
