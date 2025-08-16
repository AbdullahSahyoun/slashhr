export async function getAll(fastify) {
  const client = await fastify.pg.connect();
  try {
    const q = `
      SELECT id, title_name AS label
      FROM job_titles
      ORDER BY title_name
    `;
    const { rows } = await client.query(q);
    return rows;
  } finally {
    client.release();
  }
}
