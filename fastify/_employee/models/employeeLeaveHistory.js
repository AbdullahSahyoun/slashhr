export async function getEmployeeLeaveHistory(db, employeeId) {
  const { rows } = await db.query(
    `
    SELECT 
        l."Purpose" AS "LeaveType",
        e."Name" AS "By",
        l."StartTime" AS "From",
        l."EndTime" AS "To",
        l."Purpose" AS "Reason",
        l."Status"
    FROM organization."tblLeave" l
    JOIN organization."tblEmployee" e 
        ON e."EmployeeID" = l."EmployeeID"
    WHERE l."EmployeeID" = $1
    ORDER BY l."StartTime" DESC
    `,
    [employeeId]
  );
  return rows;
}
