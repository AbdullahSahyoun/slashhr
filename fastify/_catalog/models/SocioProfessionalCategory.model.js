/**
 * List socio-professional categories for a tenant (active only).
 */
export async function getAll(fastify, tenantId) {
  const q = `
    SELECT id, category_name AS label, is_active, "TenantID"
    FROM organization.socio_professional_categories
    WHERE "TenantID" = $1 AND is_active = TRUE
    ORDER BY category_name;
  `;
  const { rows } = await fastify.pg.query(q, [Number(tenantId)]);
  return rows; // [{ id, label, ... }]
}
