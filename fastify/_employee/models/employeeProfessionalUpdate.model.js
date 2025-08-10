// _employee/models/employeeProfessionalUpdate.model.js

const BASE_SELECT = `
  SELECT
    e."EmployeeID",
    pos."Name"         AS "JobTitle",
    dept."Name"        AS "Department",
    m."Name"           AS "Manager",
    office."Location"  AS "OfficeLocation",
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

/**
 * Update professional info by EmployeeID
 * @param db Pool (fastify.pg or node-postgres)
 * @param {number} employeeId
 * @param {object} data {
 *   positionId, departmentId, managerId, officeId,
 *   joiningDate, employmentTypeId, workModeId
 * }
 * @returns updated joined row or null
 */
export async function updateEmployeeProfessional(db, employeeId, data = {}) {
  const fieldsMap = {
    positionId: '"PositionID"',
    departmentId: '"DepartmentID"',
    managerId: '"ManagerID"',
    officeId: '"OfficeID"',
    joiningDate: '"JoiningDate"',
    employmentTypeId: '"EmploymentTypeID"',
    workModeId: '"WorkModeID"',
  };

  const buildSet = (map, src, startIndex = 1) => {
    const sets = [];
    const values = [];
    let i = startIndex;

    for (const [key, col] of Object.entries(map)) {
      if (src[key] !== undefined) {
        sets.push(`${col} = $${i++}`);
        values.push(src[key]);
      }
    }
    return { set: sets.join(', '), values, nextIndex: i };
  };

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Ensure employee exists
    const res = await client.query(
      `SELECT "EmployeeID" FROM organization."tblEmployee" WHERE "EmployeeID" = $1`,
      [employeeId]
    );
    if (res.rowCount === 0) {
      throw Object.assign(new Error('Employee not found'), { statusCode: 404 });
    }

    // Build update statement
    const empSet = buildSet(fieldsMap, data, 1);
    if (empSet.set) {
      await client.query(
        `UPDATE organization."tblEmployee"
         SET ${empSet.set}
         WHERE "EmployeeID" = $${empSet.nextIndex}`,
        [...empSet.values, employeeId]
      );
    }

    await client.query('COMMIT');

    // Return updated data
    const { rows } = await db.query(
      `${BASE_SELECT} WHERE e."EmployeeID" = $1`,
      [employeeId]
    );
    return rows[0] ?? null;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
