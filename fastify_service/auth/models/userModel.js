export async function findUserByEmail(fastify, email) {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
  } finally {
    client.release();
  }
}
