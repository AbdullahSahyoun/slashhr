// src/_organization/models/jobTitles.model.js

/** List job titles for a tenant (with optional search/pagination). */
export async function getAll(fastify, tenantId, { q, active = true, limit = 100, offset = 0 } = {}) {
  const params = [tenantId];
  const where = ['"TenantID" = $1'];

  if (typeof active === 'boolean') {
    params.push(active);
    where.push(`is_active = $${params.length}`);
  }
  if (q && String(q).trim() !== '') {
    params.push(`%${String(q).trim()}%`);
    where.push(`title_name ILIKE $${params.length}`);
  }

  params.push(Math.min(Math.max(parseInt(limit, 10) || 100, 1), 500));
  params.push(Math.max(parseInt(offset, 10) || 0, 0));

  const sql = `
    SELECT id, title_name AS label, is_active, "TenantID"
    FROM organization.job_titles
    WHERE ${where.join(' AND ')}
    ORDER BY title_name
    LIMIT $${params.length - 1}
    OFFSET $${params.length};
  `;
  const { rows } = await fastify.pg.query(sql, params);
  return rows;
}

/** Get one by id (tenant-scoped). */
export async function getById(fastify, tenantId, id) {
  const sql = `
    SELECT id, title_name AS label, is_active, "TenantID"
    FROM organization.job_titles
    WHERE id = $1 AND "TenantID" = $2
    LIMIT 1;
  `;
  const { rows } = await fastify.pg.query(sql, [id, tenantId]);
  return rows[0] || null;
}

/** Update fields (tenant-scoped). Supports: title_name, is_active */
export async function update(fastify, tenantId, id, patch = {}) {
  const sets = [];
  const params = [];

  if (patch.title_name !== undefined) {
    params.push(patch.title_name);
    sets.push(`title_name = $${params.length}`);
  }
  if (patch.is_active !== undefined) {
    params.push(!!patch.is_active);
    sets.push(`is_active = $${params.length}`);
  }

  if (sets.length === 0) return await getById(fastify, tenantId, id);

  params.push(id, tenantId);
  const sql = `
    UPDATE organization.job_titles
    SET ${sets.join(', ')}
    WHERE id = $${params.length - 1} AND "TenantID" = $${params.length}
    RETURNING id, title_name AS label, is_active, "TenantID";
  `;
  const { rows } = await fastify.pg.query(sql, params);
  return rows[0] || null;
}

/** Soft delete (deactivate). */
export async function deactivate(fastify, tenantId, id) {
  const sql = `
    UPDATE organization.job_titles
    SET is_active = FALSE
    WHERE id = $1 AND "TenantID" = $2
    RETURNING id, title_name AS label, is_active, "TenantID";
  `;
  const { rows } = await fastify.pg.query(sql, [id, tenantId]);
  return rows[0] || null;
}

/** Hard delete (permanent). */
export async function deleteHard(fastify, tenantId, id) {
  const sql = `
    DELETE FROM organization.job_titles
    WHERE id = $1 AND "TenantID" = $2
    RETURNING id;
  `;
  const { rows } = await fastify.pg.query(sql, [id, tenantId]);
  return rows[0]?.id ?? null;
}
