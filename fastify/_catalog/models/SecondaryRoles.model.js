// src/_organization/models/primaryRoles.model.js

/**
 * Get all primary roles for a tenant (active by default).
 * @param {FastifyInstance} fastify
 * @param {number} tenantId
 * @returns {Promise<Array<{id:number,label:string,is_active:boolean}>>}
 */
export async function getAll(fastify, tenantId) {
  const client = await fastify.pg.connect();
  try {
    const q = `
      SELECT id, role_name AS label, is_active, "TenantID"
      FROM organization.primary_roles
      WHERE "TenantID" = $1
        AND is_active = TRUE
      ORDER BY role_name;
    `;
    const { rows } = await client.query(q, [tenantId]);
    return rows;
  } finally {
    client.release();
  }
}
