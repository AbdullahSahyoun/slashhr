// _catalog/models/ReasonForContract.model.js
// or: src/_organization/models/contractStartReasons.model.js (adjust your import)

export async function getAll(fastify, tenantId = 1) {
  const client = await fastify.pg.connect();
  try {
    const q = `
      SELECT id, reason_name AS label
      FROM organization.contract_start_reasons
      WHERE "TenantID" = $1
        AND is_active = TRUE
      ORDER BY reason_name;
    `;
    const { rows } = await client.query(q, [Number(tenantId)]);
    return rows;
  } finally {
    client.release();
  }
}
