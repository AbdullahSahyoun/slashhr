export async function getAll(fastify) {
  const client = await fastify.pg.connect();
  try {
    const q = `
      SELECT id, name AS label
      FROM establishments
      ORDER BY name
    `;
    const { rows } = await client.query(q);
    return rows;
  } finally {
    client.release();
  }
}
