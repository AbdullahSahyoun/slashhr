// _employee/models/employeeProfessional.model.js

const BASE_SELECT = `
  SELECT
    e."EmployeeID",
    pos."Name"         AS "JobTitle",
    dept."Name"        AS "Department",
    m."Name"           AS "Manager",
    office."Location"  AS "OfficeLocation", -- ✅ fixed column name
    e."JoiningDate",
    et."Name"          AS "EmploymentType",
    wm."Name"          AS "WorkMode"
  FROM organization."tblEmployee" e
  LEFT JOIN organization."tblEmployeePosition" pos 
    ON pos."PositionID" = e."PositionID"
  LEFT JOIN organization."tblDepartment" dept 
    ON dept."DepartmentID" = e."DepartmentID"
  LEFT JOIN organization."tblOffice" office 
    ON office."OfficeID" = e."OfficeID"
  LEFT JOIN organization."tblEmploymentType" et 
    ON et."EmploymentTypeID" = e."EmploymentTypeID"
  LEFT JOIN organization."tblWorkMode" wm 
    ON wm."WorkModeID" = e."WorkModeID"
  LEFT JOIN organization."tblEmployee" m 
    ON m."EmployeeID" = e."ManagerID"
`;

export async function getEmployeeProfessional(db, employeeId) {
  const { rows } = await db.query(
    `${BASE_SELECT}
     WHERE e."EmployeeID" = $1`,
    [employeeId]
  );
  return rows[0] ?? null;
}
