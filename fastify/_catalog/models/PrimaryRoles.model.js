export async function getAll(fastify) {
  const client = await fastify.pg.connect();
  try {
    const q = `
      SELECT id, role_name AS label
      FROM primary_roles
      ORDER BY role_name
    `;
    const { rows } = await client.query(q);
    return rows;
  } finally {
    client.release();
  }
}
