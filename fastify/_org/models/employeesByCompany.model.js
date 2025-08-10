// _organization/models/employeesByCompany.model.js
export async function getEmployeesByCompanyId(db, orgId) {
  const query = `
    SELECT
      e."EmployeeID",
      e."Name" AS "EmployeeName",
      e."Gender",
      e."PhoneNumber",
      e."Nationality",
      e."PositionID",
      pos."Name" AS "Position",
      e."JoiningDate",
      e."CreatedAt"
    FROM organization."tblEmployee" e
    LEFT JOIN organization."tblEmployeePosition" pos 
      ON pos."PositionID" = e."PositionID"
    WHERE e."OrgID" = $1
    ORDER BY e."CreatedAt" DESC
  `;

  const { rows } = await db.query(query, [orgId]);
  return rows;
}
