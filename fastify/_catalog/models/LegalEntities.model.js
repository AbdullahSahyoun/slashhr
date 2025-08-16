// _catalog/models/LegalEntities.model.js
export async function getAll(fastify) {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(`
      SELECT id, entity_name AS label
      FROM legal_entities
      ORDER BY entity_name
    `);
    return rows;
  } finally {
    client.release();
  }
}
