// employee/models/EmployeeModel.js

/**
 * Get all employees
 * @param {object} db - PostgreSQL client
 */
export async function getAllEmployees(db) {
  const { rows } = await db.query('SELECT * FROM organization."tblEmployee" ORDER BY "CreatedAt" DESC');
  return rows;
}

/**
 * Get single employee by ID
 * @param {object} db - PostgreSQL client
 * @param {number} id - Employee ID
 */
export async function getEmployeeById(db, id) {
  const { rows } = await db.query('SELECT * FROM organization."tblEmployee" WHERE "EmployeeID" = $1', [id]);
  return rows[0];
}

/**
 * Create new employee
 * @param {object} db - PostgreSQL client
 * @param {object} data - Employee data
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
