import bcrypt from 'bcrypt';

/**
 * @route POST /auth/reset-password
 * @body { email: string, newPassword: string }
 */
export async function resetPassword(request, reply) {
  const { email, newPassword } = request.body;

  if (!email || !newPassword) {
    return reply.code(400).send({ error: 'Email and new password are required.' });
  }

  try {
    const client = await request.server.pg.connect();

    // Check if user exists
    const { rows } = await client.query(
      `SELECT "UserID" FROM "user"."tblUser" WHERE "Email" = $1`,
      [email]
    );

    if (rows.length === 0) {
      client.release();
      return reply.code(404).send({ error: 'User not found.' });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    // Update password
    await client.query(
      `UPDATE "user"."tblUser" SET "PasswordHash" = $1, "UpdatedAt" = NOW() WHERE "Email" = $2`,
      [hashed, email]
    );

    client.release();

    return reply.send({ message: 'Password reset successfully.' });

  } catch (error) {
    console.error('Reset error:', error);
    return reply.code(500).send({ error: 'Internal server error.' });
  }
}
