// src/_organization/models/contractTemplates.model.js

/**
 * List contract templates for a tenant (active by default).
 * Supports q (search), active (true/false/undefined), limit, offset.
 */
export async function getAll(fastify, tenantId, { q, active = true, limit = 100, offset = 0 } = {}) {
  const params = [tenantId];
  const where = ['"TenantID" = $1'];

  if (typeof active === 'boolean') {
    params.push(active);
    where.push(`is_active = $${params.length}`);
  }
  if (q && String(q).trim() !== '') {
    params.push(`%${String(q).trim()}%`);
    where.push(`template_name ILIKE $${params.length}`);
  }

  params.push(Math.min(Math.max(parseInt(limit, 10) || 100, 1), 500));
  params.push(Math.max(parseInt(offset, 10) || 0, 0));

  const sql = `
    SELECT id, template_name AS label, is_active, "TenantID"
    FROM organization.contract_templates
    WHERE ${where.join(' AND ')}
    ORDER BY template_name
    LIMIT $${params.length - 1}
    OFFSET $${params.length};
  `;

  const { rows } = await fastify.pg.query(sql, params);
  return rows;
}

/** Get one by id (tenant-scoped). */
export async function getById(fastify, tenantId, id) {
  const sql = `
    SELECT id, template_name AS label, description, content, is_active, "TenantID"
    FROM organization.contract_templates
    WHERE id = $1 AND "TenantID" = $2
    LIMIT 1;
  `;
  const { rows } = await fastify.pg.query(sql, [id, tenantId]);
  return rows[0] || null;
}

/** Create new template (tenant-scoped). */
export async function create(fastify, tenantId, { template_name, description = null, content = null }) {
  const sql = `
    INSERT INTO organization.contract_templates ("TenantID", template_name, description, content)
    VALUES ($1, $2, $3, $4)
    RETURNING id, template_name AS label, description, content, is_active, "TenantID";
  `;
  const { rows } = await fastify.pg.query(sql, [tenantId, template_name, description, content]);
  return rows[0];
}

/** Update fields (tenant-scoped). */
export async function update(fastify, tenantId, id, patch = {}) {
  const sets = [];
  const params = [];
  if (patch.template_name !== undefined) { params.push(patch.template_name); sets.push(`template_name = $${params.length}`); }
  if (patch.description   !== undefined) { params.push(patch.description);   sets.push(`description   = $${params.length}`); }
  if (patch.content       !== undefined) { params.push(patch.content);       sets.push(`content       = $${params.length}`); }
  if (patch.is_active     !== undefined) { params.push(!!patch.is_active);   sets.push(`is_active     = $${params.length}`); }

  if (sets.length === 0) return await getById(fastify, tenantId, id);

  params.push(id, tenantId);
  const sql = `
    UPDATE organization.contract_templates
    SET ${sets.join(', ')}
    WHERE id = $${params.length - 1} AND "TenantID" = $${params.length}
    RETURNING id, template_name AS label, description, content, is_active, "TenantID";
  `;
  const { rows } = await fastify.pg.query(sql, params);
  return rows[0] || null;
}

/** Soft delete (deactivate). */
export async function deactivate(fastify, tenantId, id) {
  const sql = `
    UPDATE organization.contract_templates
    SET is_active = FALSE
    WHERE id = $1 AND "TenantID" = $2
    RETURNING id, template_name AS label, is_active, "TenantID";
  `;
  const { rows } = await fastify.pg.query(sql, [id, tenantId]);
  return rows[0] || null;
}
