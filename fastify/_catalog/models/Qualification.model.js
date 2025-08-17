// src/_organization/models/qualifications.model.js

/** List qualifications for a tenant. */
export async function getAll(fastify, tenantId, { q, active = true, limit = 100, offset = 0 } = {}) {
  const params = [tenantId];
  const where = ['"TenantID" = $1'];

  if (typeof active === 'boolean') {
    params.push(active);
    where.push(`is_active = $${params.length}`);
  }
  if (q && String(q).trim() !== '') {
    params.push(`%${String(q).trim()}%`);
    where.push(`qualification_name ILIKE $${params.length}`);
  }

  params.push(Math.min(Math.max(parseInt(limit, 10) || 100, 1), 500));
  params.push(Math.max(parseInt(offset, 10) || 0, 0));

  const sql = `
    SELECT id, qualification_name AS label, is_active, "TenantID"
    FROM organization.qualifications
    WHERE ${where.join(' AND ')}
    ORDER BY qualification_name
    LIMIT $${params.length - 1}
    OFFSET $${params.length};
  `;

  const { rows } = await fastify.pg.query(sql, params);
  return rows;
}

/** Get one by id. */
export async function getById(fastify, tenantId, id) {
  const sql = `
    SELECT id, qualification_name AS label, is_active, "TenantID"
    FROM organization.qualifications
    WHERE id = $1 AND "TenantID" = $2
    LIMIT 1;
  `;
  const { rows } = await fastify.pg.query(sql, [id, tenantId]);
  return rows[0] || null;
}

/** Create qualification. */
export async function create(fastify, tenantId, qualification_name) {
  const sql = `
    INSERT INTO organization.qualifications ("TenantID", qualification_name)
    VALUES ($1, $2)
    RETURNING id, qualification_name AS label, is_active, "TenantID";
  `;
  const { rows } = await fastify.pg.query(sql, [tenantId, qualification_name]);
  return rows[0];
}

/** Update qualification. */
export async function update(fastify, tenantId, id, patch = {}) {
  const sets = [];
  const params = [];

  if (patch.qualification_name !== undefined) {
    params.push(patch.qualification_name);
    sets.push(`qualification_name = $${params.length}`);
  }
  if (patch.is_active !== undefined) {
    params.push(!!patch.is_active);
    sets.push(`is_active = $${params.length}`);
  }

  if (sets.length === 0) return await getById(fastify, tenantId, id);

  params.push(id, tenantId);
  const sql = `
    UPDATE organization.qualifications
    SET ${sets.join(', ')}
    WHERE id = $${params.length - 1} AND "TenantID" = $${params.length}
    RETURNING id, qualification_name AS label, is_active, "TenantID";
  `;
  const { rows } = await fastify.pg.query(sql, params);
  return rows[0] || null;
}

/** Soft delete (deactivate). */
export async function deactivate(fastify, tenantId, id) {
  const sql = `
    UPDATE organization.qualifications
    SET is_active = FALSE
    WHERE id = $1 AND "TenantID" = $2
    RETURNING id, qualification_name AS label, is_active, "TenantID";
  `;
  const { rows } = await fastify.pg.query(sql, [id, tenantId]);
  return rows[0] || null;
}

/** Hard delete. */
export async function deleteHard(fastify, tenantId, id) {
  const sql = `
    DELETE FROM organization.qualifications
    WHERE id = $1 AND "TenantID" = $2
    RETURNING id;
  `;
  const { rows } = await fastify.pg.query(sql, [id, tenantId]);
  return rows[0]?.id ?? null;
}
