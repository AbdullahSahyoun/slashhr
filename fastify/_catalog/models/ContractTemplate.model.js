export async function getAll(fastify) {
  const client = await fastify.pg.connect();
  try {
    const q = `
      SELECT id, template_name AS label
      FROM contract_templates
      ORDER BY template_name
    `;
    const { rows } = await client.query(q);
    return rows;
  } finally {
    client.release();
  }
}
