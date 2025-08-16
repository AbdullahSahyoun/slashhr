export async function getAll(fastify) {
  const client = await fastify.pg.connect();
  try {
    // Adjust condition to your schema (is_manager flag, role check, etc.)
    const q = `
      SELECT id, full_name AS label
      FROM employees
      WHERE is_manager = true
      ORDER BY full_name
    `;
    const { rows } = await client.query(q);
    return rows;
  } finally {
    client.release();
  }
}
