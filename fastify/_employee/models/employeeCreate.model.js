// _employee/models/employeeCreate.model.js

// Return a detailed row after creation
const BASE_SELECT = `
  SELECT
    e."EmployeeID",
    e."TenantID",
    e."OrgID",
    e."UserID",
    u."Name"           AS "FirstName",
    e."Name"           AS "PreferredName",
    u."Email"          AS "WorkEmail",
    e."DepartmentID",
    dept."Name"        AS "Department",
    e."PositionID",
    pos."Name"         AS "JobTitle",
    e."ManagerID",
    mgr."Name"         AS "Manager",
    e."OfficeID",
    off."Location"     AS "OfficeLocation",
    e."JoiningDate",
    e."EmploymentTypeID",
    et."Name"          AS "EmploymentType",
    e."WorkModeID",
    wm."Name"          AS "WorkMode",
    e."CreatedAt"
  FROM organization."tblEmployee" e
  JOIN "user"."tblUser" u ON u."UserID" = e."UserID"
  LEFT JOIN organization."tblDepartment" dept ON dept."DepartmentID" = e."DepartmentID"
  LEFT JOIN organization."tblEmployeePosition" pos ON pos."PositionID" = e."PositionID"
  LEFT JOIN organization."tblEmployee" mgr ON mgr."EmployeeID" = e."ManagerID"
  LEFT JOIN organization."tblOffice" off ON off."OfficeID" = e."OfficeID"
  LEFT JOIN organization."tblEmploymentType" et ON et."EmploymentTypeID" = e."EmploymentTypeID"
  LEFT JOIN organization."tblWorkMode" wm ON wm."WorkModeID" = e."WorkModeID"
`;

export async function createEmployee(db, payload) {
  const {
    // Required
    tenantId,
    orgId,
    firstName,
    workEmail,
    positionId,
    departmentId,
    officeId,
    joiningDate,

    // Optional
    preferredName,
    managerId,
    isOwnManager, // boolean
    employmentTypeId,
    workModeId,

    // Personal optional (store what you have at creation time)
    nationality,
    maritalStatus,
    phoneNumber,
    cin,
    personalAddress,
    dateOfBirth,     // 'YYYY-MM-DD' or ISO
    gender,

    // Company code / external id
    employeeCode,    // if you have one (maps to a column if present)
  } = payload;

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // 1) Create User
    const userRes = await client.query(
      `INSERT INTO "user"."tblUser" ("Name", "Email")
       VALUES ($1, $2)
       RETURNING "UserID"`,
      [firstName, workEmail]
    );
    const newUserId = userRes.rows[0].UserID;

    // 2) Create Employee (may set ManagerID later if self-managed)
    const insertCols = [
      '"TenantID"', '"OrgID"', '"UserID"', '"PositionID"', '"DepartmentID"',
      '"OfficeID"', '"JoiningDate"', '"Name"', '"EmploymentTypeID"', '"WorkModeID"',
      '"Nationality"', '"MaritalStatus"', '"PhoneNumber"', '"CIN"', '"PersonalAddress"',
      '"DateOfBirth"', '"Gender"'
    ];
    const insertVals = [
      tenantId, orgId, newUserId, positionId, departmentId,
      officeId, joiningDate, preferredName ?? firstName, employmentTypeId ?? null, workModeId ?? null,
      nationality ?? null, maritalStatus ?? null, phoneNumber ?? null, cin ?? null, personalAddress ?? null,
      dateOfBirth ?? null, gender ?? null
    ];

    // If you have an EmployeeCode column, include it:
    // insertCols.push('"EmployeeCode"'); insertVals.push(employeeCode ?? null);

    const placeholders = insertVals.map((_, i) => `$${i + 1}`).join(', ');

    const empRes = await client.query(
      `INSERT INTO organization."tblEmployee" (${insertCols.join(', ')})
       VALUES (${placeholders})
       RETURNING "EmployeeID"`,
      insertVals
    );
    const newEmployeeId = empRes.rows[0].EmployeeID;

    // 3) Manager handling
    if (isOwnManager === true) {
      await client.query(
        `UPDATE organization."tblEmployee"
         SET "ManagerID" = $1
         WHERE "EmployeeID" = $1`,
        [newEmployeeId]
      );
    } else if (managerId) {
      await client.query(
        `UPDATE organization."tblEmployee"
         SET "ManagerID" = $1
         WHERE "EmployeeID" = $2`,
        [managerId, newEmployeeId]
      );
    }

    await client.query('COMMIT');

    // 4) Return composed row
    const { rows } = await db.query(
      `${BASE_SELECT} WHERE e."EmployeeID" = $1`,
      [newEmployeeId]
    );
    return rows[0];
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
