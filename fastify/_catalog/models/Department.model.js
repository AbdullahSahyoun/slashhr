export async function getAll(fastify) {
  const client = await fastify.pg.connect();
  try {
    const q = `
      SELECT id, department_name AS label
      FROM departments
      ORDER BY department_name
    `;
    const { rows } = await client.query(q);
    return rows;
  } finally {
    client.release();
  }
}
