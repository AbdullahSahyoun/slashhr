export async function getUserInfo(request, reply) {
  const { email, tenantId } = request.query;

  try {
    const client = await request.server.pg.connect();

    const query = `
      SELECT 
        u."UserID", u."Name", u."Email", u."TenantID", 
        u."IsActive", u."CreatedAt", u."UpdatedAt",
        r."RoleName"
      FROM "user"."tblUser" u
      LEFT JOIN "user"."tblUserRole" r ON u."RoleID" = r."RoleID"
      WHERE u."Email" = $1 AND u."TenantID" = $2
      LIMIT 1;
    `;

    const { rows } = await client.query(query, [email, tenantId]);
    client.release();

    const user = rows[0];

    if (!user) {
      return reply.code(404).send({ error: 'User not found' });
    }

    return reply.send({
      id: user.UserID,
      name: user.Name,
      email: user.Email,
      tenantId: user.TenantID,
      isActive: user.IsActive,
      createdAt: user.CreatedAt,
      updatedAt: user.UpdatedAt,
      role: user.RoleName
    });

  } catch (error) {
    console.error('User info error:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
