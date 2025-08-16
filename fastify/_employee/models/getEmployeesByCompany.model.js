// _employee/models/getEmployeesByCompany.model.js

const BASE_SELECT = `
  SELECT
    e."EmployeeID",
    u."UserID",
    split_part(u."Name", ' ', 1)             AS "FirstName",
    NULLIF(split_part(u."Name", ' ', 2), '') AS "LastName",
    pos."Name"                               AS "Job",
    e."JoiningDate"                          AS "Hired",
    e."Status"                               AS "Status",
    u."Photo"                                AS "Photo"
  FROM organization."tblEmployee" e
  JOIN "user"."tblUser" u
    ON e."UserID" = u."UserID"
  LEFT JOIN organization."tblEmployeePosition" pos
    ON e."PositionID" = pos."PositionID"
`;

export async function getEmployeesByCompany(db, orgId) {
  const { rows } = await db.query(
    `${BASE_SELECT}
     WHERE e."OrgID" = $1
     ORDER BY e."EmployeeID" ASC`,
    [orgId]
  );
  return rows;
}
