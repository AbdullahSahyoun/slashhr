export async function updateUserInfo(request, reply) {
  const { userId, tenantId, name, roleId, isActive } = request.body;

  if (!userId || !tenantId) {
    return reply.code(400).send({ error: 'userId and tenantId are required.' });
  }

  const client = await request.server.pg.connect();

  try {
    // 🔍 Step 1: Verify user exists
    const checkUser = await client.query(
      `SELECT "UserID" FROM "user"."tblUser" WHERE "UserID" = $1 AND "TenantID" = $2`,
      [userId, tenantId]
    );

    if (checkUser.rows.length === 0) {
      return reply.code(404).send({ error: 'User not found.' });
    }

    // ✏️ Step 2: Prepare dynamic update
    const updates = [];
    const values = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`"Name" = $${paramIndex++}`);
      values.push(name);
    }

    if (roleId !== undefined) {
      updates.push(`"RoleID" = $${paramIndex++}`);
      values.push(roleId);
    }

    if (isActive !== undefined) {
      updates.push(`"IsActive" = $${paramIndex++}`);
      values.push(isActive);
    }

    if (updates.length === 0) {
      return reply.code(400).send({ error: 'No fields to update.' });
    }

    // Add WHERE clause
    values.push(userId);
    values.push(tenantId);

    const query = `
      UPDATE "user"."tblUser"
      SET ${updates.join(', ')}, "UpdatedAt" = NOW()
      WHERE "UserID" = $${paramIndex++} AND "TenantID" = $${paramIndex}
    `;

    // 🪵 Debug output
    console.log('🟡 SQL Query:', query);
    console.log('🟢 Values:', values);

    // ✅ Run the query
    await client.query(query, values);

    return reply.send({ message: 'User updated successfully.' });

  } catch (error) {
    console.error('🔥 Update error:', error.stack || error);
    return reply.code(500).send({ error: 'Internal server error.' });
  } finally {
    client.release(); // ✅ Always release connection
  }
}
