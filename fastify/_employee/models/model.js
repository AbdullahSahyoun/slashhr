// employee/models/EmployeeModel.js

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
 * Get single employee by ID
 * @param {object} db - PostgreSQL client
 * @param {number} id - Employee ID
 * @returns {Promise<object|null>} Employee object or null if not found
 */
export async function getEmployeeById(db, id) {
  const { rows } = await db.query(
    'SELECT * FROM organization."tblEmployee" WHERE "EmployeeID" = $1', 
    [id]
  );
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