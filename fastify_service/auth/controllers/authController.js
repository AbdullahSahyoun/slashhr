import bcrypt from 'bcrypt';

export async function login(request, reply) {
  const { email, password } = request.body;

  try {
    const client = await request.server.pg.connect();

    const query = `
      SELECT "UserID", "TenantID", "Email", "PasswordHash"
      FROM "user"."tblUser"
      WHERE "Email" = $1
      LIMIT 1
    `;

    const { rows } = await client.query(query, [email]);
    client.release();

    // ✅ Fix: Check rows.length instead of relying on user = rows[0]
    if (!rows.length) {
      return reply.code(401).send({ error: 'User not found' });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.PasswordHash);

    if (!match) {
      return reply.code(401).send({ error: 'Invalid password' });
    }

    return reply.send({
      token: 'fake-token', // Replace with real JWT if needed
      user: {
        id: user.UserID,
        tenantId: user.TenantID,
        email: user.Email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
