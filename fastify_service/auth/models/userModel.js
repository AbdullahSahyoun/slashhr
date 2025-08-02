// 🔍 Find user by email
export async function findUserByEmail(fastify, email) {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(`
      SELECT "UserID", "Email", "TenantID", "PasswordHash"
      FROM "user"."tblUser"
      WHERE "Email" = $1
      LIMIT 1
    `, [email]);
    return rows[0];
  } finally {
    client.release();
  }
}

// ➕ Insert OTP login code
export async function insertOtpCode(fastify, userId, email, code) {
  const client = await fastify.pg.connect();
  try {
    await client.query(`
      INSERT INTO "user"."tblLoginOTP" ("UserID", "Email", "Code", "CreatedAt")
      VALUES ($1, $2, $3, NOW())
    `, [userId, email, code]);
  } finally {
    client.release();
  }
}

// ✅ Verify OTP code (within 10 minutes)
export async function verifyOtpCode(fastify, email, code) {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(`
      SELECT u."UserID", u."Email", u."TenantID"
      FROM "user"."tblLoginOTP" otp
      JOIN "user"."tblUser" u ON otp."UserID" = u."UserID"
      WHERE otp."Email" = $1 AND otp."Code" = $2
        AND otp."CreatedAt" > NOW() - INTERVAL '10 minutes'
      ORDER BY otp."CreatedAt" DESC
      LIMIT 1
    `, [email, code]);

    return rows[0];
  } finally {
    client.release();
  }
}
