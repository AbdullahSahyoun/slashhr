// _catalog/models/SecondaryRoles.model.js
export async function getAll(fastify) {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(`
      SELECT id, role_name AS label
      FROM secondary_roles
      ORDER BY role_name
    `);
    return rows;
  } finally {
    client.release();
  }
}
