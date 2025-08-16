export async function getAll(fastify) {
  const client = await fastify.pg.connect();
  try {
    const q = `
      SELECT id, reason_name AS label
      FROM contract_start_reasons
      ORDER BY reason_name
    `;
    const { rows } = await client.query(q);
    return rows;
  } finally {
    client.release();
  }
}
