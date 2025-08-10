// _employee/models/employeePersonalUpdate.model.js

// Reuse the same SELECT shape your app expects
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

/**
 * Update personal info by EmployeeID (transaction-safe).
 * Only updates fields provided in `data`.
 *
 * @param db pool (fastify.pg or node-postgres Pool)
 * @param {number} employeeId
 * @param {object} data {
 *   firstName, personalEmail,        // -> "user"."tblUser"
 *   preferredName, gender, dateOfBirth, nationality,
 *   maritalStatus, phoneNumber, cin, personalAddress // -> org."tblEmployee"
 * }
 * @returns joined updated row or null
 */
export async function updateEmployeePersonal(db, employeeId, data = {}) {
  const userFieldsMap = {
    firstName: '"Name"',
    personalEmail: '"Email"',
  };

  const employeeFieldsMap = {
    preferredName: '"Name"',
    gender: '"Gender"',
    dateOfBirth: '"DateOfBirth"',
    nationality: '"Nationality"',
    maritalStatus: '"MaritalStatus"',
    phoneNumber: '"PhoneNumber"',
    cin: '"CIN"',
    personalAddress: '"PersonalAddress"',
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

    // Ensure employee exists & get linked UserID
    const res = await client.query(
      `SELECT "UserID" FROM organization."tblEmployee" WHERE "EmployeeID" = $1`,
      [employeeId]
    );
    if (res.rowCount === 0) {
      throw Object.assign(new Error('Employee not found'), { statusCode: 404 });
    }
    const { UserID } = res.rows[0];

    // Update "user"."tblUser" if needed
    const userSet = buildSet(userFieldsMap, data, 1);
    if (userSet.set) {
      await client.query(
        `UPDATE "user"."tblUser"
         SET ${userSet.set}
         WHERE "UserID" = $${userSet.nextIndex}`,
        [...userSet.values, UserID]
      );
    }

    // Update organization."tblEmployee" if needed
    const empSet = buildSet(employeeFieldsMap, data, 1);
    if (empSet.set) {
      await client.query(
        `UPDATE organization."tblEmployee"
         SET ${empSet.set}
         WHERE "EmployeeID" = $${empSet.nextIndex}`,
        [...empSet.values, employeeId]
      );
    }

    await client.query('COMMIT');

    // Return fresh row
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
