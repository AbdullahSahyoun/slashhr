// _createEmpTemp/models.js
function slugifyName(name = '') {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')      // spaces & symbols -> dots
    .replace(/^\.+|\.+$/g, '')        // trim dots
    .slice(0, 64);                    // keep it sane
}

/**
 * Creates a user (cloning fields from template userId=1), then creates the employee.
 * Returns { user: {...}, employee: {...} }
 */
export async function createUserAndEmployee(fastify, tenantId, data) {
  const client = await fastify.pg.connect();
  try {
    await client.query('BEGIN');

    // 1) Load template user (UserID = 1)
    const tmplRes = await client.query(`
      SELECT "RoleID","PasswordHash","IsActive","Photo"
      FROM "user"."tblUser"
      WHERE "UserID" = 1
      LIMIT 1
    `);
    const tmpl = tmplRes.rows[0] || {};

    // 2) Insert new user with temporary email, then update with final email including UserID
    const name = data.name?.trim();
    if (!name) throw new Error('Name is required to create user/employee');

    const tempEmail = 'pending@slashr.ma';
    const insUserRes = await client.query(
      `
      INSERT INTO "user"."tblUser"
        ("TenantID","RoleID","Name","Email","PasswordHash","IsActive","CreatedAt","UpdatedAt","Photo")
      VALUES
        ($1, $2, $3, $4, $5, COALESCE($6, TRUE), NOW(), NOW(), $7)
      RETURNING "UserID","Name","TenantID","RoleID","IsActive","Photo"
      `,
      [
        tenantId,
        tmpl.RoleID ?? 2,            // sensible default if template missing
        name,
        tempEmail,
        tmpl.PasswordHash ?? '',     // if blank, force reset later from your app
        tmpl.IsActive ?? true,
        tmpl.Photo ?? null
      ]
    );
    const newUser = insUserRes.rows[0];

    const email = `${slugifyName(name)}.${newUser.UserID}@slashr.ma`;
    await client.query(
      `UPDATE "user"."tblUser" SET "Email"=$1, "UpdatedAt"=NOW() WHERE "UserID"=$2`,
      [email, newUser.UserID]
    );

    // 3) Insert employee row using the new UserID
    const empSql = `
      INSERT INTO organization."tblEmployee" (
        "TenantID","UserID","PositionID","OrgID","Name","Gender",
        "Nationality","DateOfBirth","MaritalStatus","PhoneNumber",
        "CIN","PersonalAddress","DepartmentID","ManagerID","OfficeID",
        "JoiningDate","EmploymentTypeID","Status"
      ) VALUES (
        $1,$2,$3,$4,$5,$6,
        $7,$8,$9,$10,
        $11,$12,$13,$14,$15,
        $16,$17,$18
      )
      RETURNING "EmployeeID","Name","TenantID","DepartmentID","UserID"
    `;

    const empParams = [
      tenantId,
      newUser.UserID,
      data.positionId ?? 1,
      data.orgId ?? 2,
      name,
      data.gender ?? 'Male',
      data.nationality ?? 'Moroccan',
      data.dateOfBirth ?? "2000-11-09T21:00:00.000Z",
      data.maritalStatus ?? 'Single',
      data.phoneNumber ?? '0000',
      data.cin ?? 'AAA',
      data.personalAddress ?? 'Moroccan',
      data.departmentId ?? 1,
      data.managerId ?? 12,
      data.officeId ?? 1,
      data.joiningDate ?? null,
      data.employmentTypeId ?? 1,
      data.status ?? 'true'
    ];

    const empRes = await client.query(empSql, empParams);
    const employee = empRes.rows[0];

    await client.query('COMMIT');

    return {
      user: { ...newUser, Email: email },
      employee
    };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
