// src/_organization/models/establishments.model.js

/**
 * Get all establishments for a tenant (active by default).
 * @param {FastifyInstance} fastify
 * @param {number} tenantId
 * @returns {Promise<Array>}
 */
export async function getAll(fastify, tenantId) {
  const client = await fastify.pg.connect();
  try {
    const q = `
      SELECT id, name AS label, is_active, "TenantID"
      FROM organization.establishments
      WHERE is_active = TRUE
        AND "TenantID" = $1
      ORDER BY name;
    `;
    const { rows } = await client.query(q, [tenantId]);
    return rows;
  } finally {
    client.release();
  }
}

/**
 * Get one establishment by ID (scoped to tenant).
 * @param {FastifyInstance} fastify
 * @param {number} tenantId
 * @param {number} id
 */
export async function getById(fastify, tenantId, id) {
  const q = `
    SELECT id, name AS label, is_active, "TenantID"
    FROM organization.establishments
    WHERE id = $1 AND "TenantID" = $2
    LIMIT 1;
  `;
  const { rows } = await fastify.pg.query(q, [id, tenantId]);
  return rows[0] || null;
}

/**
 * Create new establishment for a tenant.
 * @param {FastifyInstance} fastify
 * @param {number} tenantId
 * @param {string} name
 */
export async function create(fastify, tenantId, name) {
  const q = `
    INSERT INTO organization.establishments ("TenantID", name)
    VALUES ($1, $2)
    RETURNING id, name AS label, is_active, "TenantID";
  `;
  const { rows } = await fastify.pg.query(q, [tenantId, name]);
  return rows[0];
}

/**
 * Deactivate establishment (soft delete) for a tenant.
 * @param {FastifyInstance} fastify
 * @param {number} tenantId
 * @param {number} id
 */
export async function deactivate(fastify, tenantId, id) {
  const q = `
    UPDATE organization.establishments
    SET is_active = FALSE
    WHERE id = $1 AND "TenantID" = $2
    RETURNING id, name AS label, is_active, "TenantID";
  `;
  const { rows } = await fastify.pg.query(q, [id, tenantId]);
  return rows[0];
}
