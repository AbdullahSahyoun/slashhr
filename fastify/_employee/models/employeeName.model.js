// Get employee name by EmployeeID
export async function getEmployeeName(db, employeeId) {
  const { rows } = await db.query(
    `
    SELECT 
      e."EmployeeID",
      e."Name" AS "EmployeeName"
    FROM organization."tblEmployee" e
    WHERE e."EmployeeID" = $1
    `,
    [employeeId]
  );

  // Return just the name, or null if not found
  return rows[0]?.EmployeeName ?? null;
}
