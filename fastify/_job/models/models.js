// Data access for organization.job_titles
// Columns: id, "TenantID", title_name, description, is_active, created_at, updated_at

const TABLE_TITLES = 'organization.job_titles';

export const JobTitleModel = {
  /* ======================= LISTS ======================= */
  async listByTenant(pg, tenantId) {
    const { rows } = await pg.query(
      `SELECT id, "TenantID", title_name, description, is_active, created_at, updated_at
       FROM ${TABLE_TITLES}
       WHERE "TenantID" = $1
       ORDER BY lower(title_name) ASC`,
      [tenantId]
    );
    return rows;
  },

  /* ================ SINGLE RECORD ================ */
  async getById(pg, id) {
    const { rows } = await pg.query(
      `SELECT id, "TenantID", title_name, description, is_active, created_at, updated_at
       FROM ${TABLE_TITLES}
       WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  },

  /* ======================= CREATE ======================= */
  // payload: { TenantID, title_name, description?, is_active? }
  async create(pg, payload) {
    const { TenantID, title_name, description = null, is_active = true } = payload;

    const { rows } = await pg.query(
      `INSERT INTO ${TABLE_TITLES} ("TenantID", title_name, description, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, "TenantID", title_name, description, is_active, created_at, updated_at`,
      [TenantID, title_name, description, is_active]
    );
    return rows[0];
  },

  /* ======================= UPDATE ======================= */
  // payload: { title_name?, description?, is_active? }
  async update(pg, id, payload) {
    const allowed = ['title_name', 'description', 'is_active'];
    const setParts = [];
    const vals = [];
    let i = 1;

    for (const [k, v] of Object.entries(payload)) {
      if (!allowed.includes(k)) continue;
      setParts.push(`${k} = $${i++}`);
      vals.push(v);
    }

    if (!setParts.length) {
      // nothing to update: return current record
      return this.getById(pg, id);
    }

    vals.push(id);
    const { rows } = await pg.query(
      `UPDATE ${TABLE_TITLES}
       SET ${setParts.join(', ')}, updated_at = NOW()
       WHERE id = $${i}
       RETURNING id, "TenantID", title_name, description, is_active, created_at, updated_at`,
      vals
    );
    return rows[0] || null;
  },

  /* ======================= DELETE ======================= */
  async remove(pg, id) {
    const { rows } = await pg.query(
      `DELETE FROM ${TABLE_TITLES}
       WHERE id = $1
       RETURNING id, "TenantID", title_name, description, is_active, created_at, updated_at`,
      [id]
    );
    return rows[0] || null;
  },

  /* ====== Extra: count how many employees use each job title ====== */
  async withEmployeeCounts(pg, tenantId) {
    const { rows } = await pg.query(
      `SELECT jt.id, jt."TenantID", jt.title_name, jt.description, jt.is_active,
              jt.created_at, jt.updated_at,
              COUNT(e.employeeid) AS employee_count
       FROM ${TABLE_TITLES} jt
       LEFT JOIN organization.tblemployee e
              ON e.jobtitleid = jt.id AND e."TenantID" = jt."TenantID"
       WHERE jt."TenantID" = $1
       GROUP BY jt.id, jt."TenantID", jt.title_name, jt.description, jt.is_active, jt.created_at, jt.updated_at
       ORDER BY lower(jt.title_name) ASC`,
      [tenantId]
    );
    return rows;
  },
};
