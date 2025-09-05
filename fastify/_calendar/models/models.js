// _calendar/models/models.js
// Calendar data-access layer (PostgreSQL)
// Tables used:
//   calendar."tblCalendar"              => CalendarID, TenantID, Name, Description
//   calendar."tblEvents"                => EventID, CalendarID, Title, StartTime, EndTime, Description
//   calendar."tblOrganisationCalendar"  => OrgCalID, OrgID, CalendarID

/**
 * Small helper: returns first row or null
 */
function one(res) {
  return (res && res.rows && res.rows[0]) || null;
}

/* ================================
 * CALENDARS
 * ================================ */
export const CalendarModel = {
  /**
   * List calendars for a tenant (optional search by name)
   * @param {Pool} pg
   * @param {Object} opts
   * @param {number} opts.tenantId
   * @param {string} [opts.q]
   */
  async list(pg, { tenantId, q }) {
    let sql = `
      SELECT "CalendarID" AS id,
             "TenantID"  AS "tenantId",
             "Name"      AS name,
             "Description" AS description
      FROM calendar."tblCalendar"
      WHERE ($1::int IS NULL OR "TenantID" = $1)
    `;
    const params = [tenantId ?? null];
    if (q) {
      sql += ` AND lower("Name") LIKE $2`;
      params.push(`%${q.toLowerCase()}%`);
    }
    sql += ` ORDER BY "Name" ASC`;
    const res = await pg.query(sql, params);
    return res.rows;
  },

  /**
   * Get single calendar by id
   */
  async getById(pg, id) {
    const res = await pg.query(
      `SELECT "CalendarID" AS id,
              "TenantID"  AS "tenantId",
              "Name"      AS name,
              "Description" AS description
       FROM calendar."tblCalendar"
       WHERE "CalendarID" = $1`,
      [id]
    );
    return one(res);
  },

  /**
   * Create calendar
   */
  async create(pg, { tenantId, name, description = null }) {
    const res = await pg.query(
      `INSERT INTO calendar."tblCalendar" ("TenantID","Name","Description")
       VALUES ($1,$2,$3)
       RETURNING "CalendarID" AS id,
                 "TenantID"  AS "tenantId",
                 "Name"      AS name,
                 "Description" AS description`,
      [tenantId, name, description]
    );
    return one(res);
  },

  /**
   * Update calendar (partial)
   */
  async update(pg, id, { name = null, description = null }) {
    const res = await pg.query(
      `UPDATE calendar."tblCalendar" SET
         "Name" = COALESCE($2,"Name"),
         "Description" = COALESCE($3,"Description")
       WHERE "CalendarID" = $1
       RETURNING "CalendarID" AS id,
                 "TenantID"  AS "tenantId",
                 "Name"      AS name,
                 "Description" AS description`,
      [id, name, description]
    );
    return one(res);
  },

  /**
   * Delete calendar
   */
  async remove(pg, id) {
    const res = await pg.query(
      `DELETE FROM calendar."tblCalendar" WHERE "CalendarID" = $1`,
      [id]
    );
    return { deleted: res.rowCount };
  },

  /**
   * List calendars attached to an organization
   */
  async listByOrg(pg, orgId) {
    const res = await pg.query(
      `SELECT c."CalendarID" AS id,
              c."TenantID"  AS "tenantId",
              c."Name"      AS name,
              c."Description" AS description
       FROM calendar."tblOrganisationCalendar" oc
       JOIN calendar."tblCalendar" c ON c."CalendarID" = oc."CalendarID"
       WHERE oc."OrgID" = $1
       ORDER BY c."Name" ASC`,
      [orgId]
    );
    return res.rows;
  },
};

/* ================================
 * EVENTS
 * ================================ */
export const EventModel = {
  /**
   * List events by calendar with optional range and search
   * @param {Pool} pg
   * @param {Object} opts
   * @param {number} opts.calendarId
   * @param {string} [opts.from]  ISO date-time
   * @param {string} [opts.to]    ISO date-time
   * @param {string} [opts.q]     search in Title
   */
  async list(pg, { calendarId, from, to, q }) {
    let sql = `
      SELECT "EventID"   AS id,
             "CalendarID" AS "calendarId",
             "Title"     AS title,
             "StartTime" AS start,
             "EndTime"   AS "end",
             "Description" AS description
      FROM calendar."tblEvents"
      WHERE "CalendarID" = $1
    `;
    const params = [calendarId];

    if (from) { sql += ` AND "StartTime" >= $${params.length + 1}`; params.push(from); }
    if (to)   { sql += ` AND "EndTime"   <= $${params.length + 1}`; params.push(to); }
    if (q)    { sql += ` AND lower("Title") LIKE $${params.length + 1}`; params.push(`%${q.toLowerCase()}%`); }

    sql += ` ORDER BY "StartTime" ASC`;
    const res = await pg.query(sql, params);
    return res.rows;
  },

  /**
   * Get event by id
   */
  async getById(pg, eventId) {
    const res = await pg.query(
      `SELECT "EventID"   AS id,
              "CalendarID" AS "calendarId",
              "Title"     AS title,
              "StartTime" AS start,
              "EndTime"   AS "end",
              "Description" AS description
       FROM calendar."tblEvents"
       WHERE "EventID" = $1`,
      [eventId]
    );
    return one(res);
  },

  /**
   * Create event
   */
  async create(pg, { calendarId, title, start, end, description = null }) {
    const res = await pg.query(
      `INSERT INTO calendar."tblEvents"
         ("CalendarID","Title","StartTime","EndTime","Description")
       VALUES ($1,$2,$3,$4,$5)
       RETURNING "EventID"   AS id,
                 "CalendarID" AS "calendarId",
                 "Title"     AS title,
                 "StartTime" AS start,
                 "EndTime"   AS "end",
                 "Description" AS description`,
      [calendarId, title, start, end, description]
    );
    return one(res);
  },

  /**
   * Update event (partial)
   */
  async update(pg, eventId, { title = null, start = null, end = null, description = null }) {
    const res = await pg.query(
      `UPDATE calendar."tblEvents" SET
         "Title"     = COALESCE($2,"Title"),
         "StartTime" = COALESCE($3,"StartTime"),
         "EndTime"   = COALESCE($4,"EndTime"),
         "Description" = COALESCE($5,"Description")
       WHERE "EventID" = $1
       RETURNING "EventID"   AS id,
                 "CalendarID" AS "calendarId",
                 "Title"     AS title,
                 "StartTime" AS start,
                 "EndTime"   AS "end",
                 "Description" AS description`,
      [eventId, title, start, end, description]
    );
    return one(res);
  },

  /**
   * Delete event
   */
  async remove(pg, eventId) {
    const res = await pg.query(
      `DELETE FROM calendar."tblEvents" WHERE "EventID" = $1`,
      [eventId]
    );
    return { deleted: res.rowCount };
  },
};

/* ================================
 * ORG ↔ CALENDAR LINK
 * ================================ */
export const OrgCalendarModel = {
  /**
   * Link org to calendar (idempotent)
   */
  async link(pg, { orgId, calendarId }) {
    const res = await pg.query(
      `INSERT INTO calendar."tblOrganisationCalendar" ("OrgID","CalendarID")
       VALUES ($1,$2)
       ON CONFLICT ("OrgID","CalendarID") DO NOTHING
       RETURNING "OrgCalID" AS id, "OrgID" AS "orgId", "CalendarID" AS "calendarId"`,
      [orgId, calendarId]
    );
    // If conflict, no row is returned
    return one(res) || { created: false, exists: true, orgId, calendarId };
  },

  /**
   * Unlink org from calendar
   */
  async unlink(pg, { orgId, calendarId }) {
    const res = await pg.query(
      `DELETE FROM calendar."tblOrganisationCalendar"
       WHERE "OrgID"=$1 AND "CalendarID"=$2`,
      [orgId, calendarId]
    );
    return { deleted: res.rowCount };
  },
};
