/**
 * Get all employees
 * @param {object} db - PostgreSQL client
 * @returns {Promise<Array>} List of employees
 */
export async function getAllEmployees(db) {
  const { rows } = await db.query(
    'SELECT * FROM organization."tblEmployee" ORDER BY "CreatedAt" DESC'
  );
  return rows;
}

/**
 * Get single employee by EmployeeID (raw)
 * @param {object} db - PostgreSQL client
 * @param {number} id - Employee ID
 * @returns {Promise<object|null>} Employee object or null
 */
export async function getEmployeeById(db, id) {
  const { rows } = await db.query(
    'SELECT * FROM organization."tblEmployee" WHERE "EmployeeID" = $1',
    [id]
  );
  return rows[0] || null;
}

/**
 * Get detailed employee info by UserID (with joins)
 * @param {object} db - PostgreSQL client
 * @param {number} userId - User ID
 * @returns {Promise<object|null>} Detailed employee object or null
 */
export async function getEmployeeDetailsByUserId(db, userId) {
  const query = `
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
    WHERE e."UserID" = $1
    LIMIT 1
  `;

  const { rows } = await db.query(query, [userId]);
  return rows[0] || null;
}

/**
 * Create new employee
 * @param {object} db - PostgreSQL client
 * @param {object} data - Employee data
 * @returns {Promise<object>} Created employee ID
 */
export async function createEmployee(db, data) {
  const {
    TenantID,
    UserID = null,
    PositionID = null,
    OrgID = null,
    Name
  } = data;

  const query = `
    INSERT INTO organization."tblEmployee"
      ("TenantID", "UserID", "PositionID", "OrgID", "Name", "CreatedAt")
    VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
    RETURNING "EmployeeID";
  `;

  const values = [TenantID, UserID, PositionID, OrgID, Name];
  const { rows } = await db.query(query, values);
  return rows[0];
}

/**
 * Update employee
 * @param {object} db - PostgreSQL client
 * @param {number} id - Employee ID
 * @param {object} data - Update data
 * @returns {Promise<boolean>} True if update was successful
 */
export async function updateEmployee(db, id, data) {
  const {
    TenantID,
    UserID = null,
    PositionID = null,
    OrgID = null,
    Name
  } = data;

  const query = `
    UPDATE organization."tblEmployee"
    SET 
      "TenantID" = $1,
      "UserID" = $2,
      "PositionID" = $3,
      "OrgID" = $4,
      "Name" = $5,
      "UpdatedAt" = CURRENT_TIMESTAMP
    WHERE "EmployeeID" = $6
    RETURNING "EmployeeID";
  `;

  const values = [TenantID, UserID, PositionID, OrgID, Name, id];
  const { rowCount } = await db.query(query, values);
  return rowCount > 0;
}

/**
 * Delete employee
 * @param {object} db - PostgreSQL client
 * @param {number} id - Employee ID
 * @returns {Promise<boolean>} True if deletion was successful
 */
export async function deleteEmployee(db, id) {
  const { rowCount } = await db.query(
    'DELETE FROM organization."tblEmployee" WHERE "EmployeeID" = $1',
    [id]
  );
  return rowCount > 0;
}

/**
 * Get professional employee information (Job Title, Dept, Manager, etc.)
 * @param {object} db - PostgreSQL client
 * @param {number} employeeId - Employee ID
 * @returns {Promise<object|null>} Professional info object
 */
export async function getEmployeeProfessionalInfo(db, employeeId) {
  const query = `
    SELECT
      e."EmployeeID",
      pos."Name" AS "JobTitle",
      dept."Name" AS "Department",
      mgr."Name" AS "Manager",
      office."Location" AS "OfficeLocation",
      e."JoiningDate",
      etype."Name" AS "EmploymentType",
      wmode."Name" AS "WorkMode"
    FROM organization."tblEmployee" e
    LEFT JOIN organization."tblEmployeePosition" pos ON e."PositionID" = pos."PositionID"
    LEFT JOIN organization."tblDepartment" dept ON e."DepartmentID" = dept."DepartmentID"
    LEFT JOIN organization."tblEmployee" mgr ON e."ManagerID" = mgr."EmployeeID"
    LEFT JOIN organization."tblOffice" office ON e."OfficeID" = office."OfficeID"
    LEFT JOIN organization."tblEmploymentType" etype ON e."EmploymentTypeID" = etype."EmploymentTypeID"
    LEFT JOIN organization."tblWorkMode" wmode ON e."WorkModeID" = wmode."WorkModeID"
    WHERE e."EmployeeID" = $1
  `;
  const { rows } = await db.query(query, [employeeId]);
  return rows[0] || null;
}
