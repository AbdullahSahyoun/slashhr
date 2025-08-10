// _employee/models/employeePersonal.model.js

const BASE_SELECT = `
  SELECT
    e."EmployeeID",
    e."UserID",
    u."Name" AS "FirstName",
    e."Name" AS "PreferredName",
    u."Email" AS "PersonalEmail",
    e."Gender",
    e."DateOfBirth",
    e."Nationality",
    e."MaritalStatus",
    e."PhoneNumber",
    e."CIN",
    e."PersonalAddress",
    e."CreatedAt" AS "EmployeeCreatedAt",
    pos."Name" AS "Position",
    org."Name" AS "Organization"
  FROM organization."tblEmployee" e
  JOIN "user"."tblUser" u ON e."UserID" = u."UserID"
  LEFT JOIN organization."tblEmployeePosition" pos ON e."PositionID" = pos."PositionID"
  LEFT JOIN organization."tblOrganisation" org ON e."OrgID" = org."OrgID"
`;

export async function getEmployeePersonal(db, employeeId) {
  const { rows } = await db.query(
    `${BASE_SELECT}
     WHERE e."EmployeeID" = $1`,
    [employeeId]
  );
  return rows[0] ?? null;
}

export async function listEmployeePersonal(db, { limit = 20, offset = 0 } = {}) {
  const { rows } = await db.query(
    `${BASE_SELECT}
     ORDER BY e."CreatedAt" DESC NULLS LAST, e."EmployeeID" DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return rows;
}
