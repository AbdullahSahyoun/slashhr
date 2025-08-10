// _employee/models/employeeDelete.model.js

/**
 * Delete an employee by EmployeeID.
 * - Looks up the linked UserID.
 * - Deletes employee row.
 * - Optionally deletes linked user row (hard=true).
 *
 * NOTE: If other tables reference EmployeeID and do not have
 * ON DELETE CASCADE, this may fail with FK errors.
 *
 * @param db - fastify.pg or node-postgres Pool
 * @param {number} employeeId
 * @param {{ hard?: boolean, deleteUser?: boolean }} options
 *   hard: when true, perform hard delete (default true)
 *   deleteUser: when true, also delete the linked user (default true)
 *
 * @returns {boolean} true if deleted, false if not found
 */
export async function deleteEmployee(db, employeeId, options = {}) {
  const { hard = true, deleteUser = true } = options;

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Verify employee exists and get UserID
    const res = await client.query(
      `SELECT "UserID" FROM organization."tblEmployee" WHERE "EmployeeID" = $1`,
      [employeeId]
    );
    if (res.rowCount === 0) {
      await client.query('ROLLBACK');
      return false; // not found
    }
    const { UserID } = res.rows[0];

    if (hard) {
      // HARD DELETE: remove employee row
      await client.query(
        `DELETE FROM organization."tblEmployee" WHERE "EmployeeID" = $1`,
        [employeeId]
      );

      // Optionally delete user row
      if (deleteUser && UserID) {
        await client.query(
          `DELETE FROM "user"."tblUser" WHERE "UserID" = $1`,
          [UserID]
        );
      }
    } else {
      // SOFT DELETE pattern (uncomment if your schema has these columns)
      // await client.query(
      //   `UPDATE organization."tblEmployee"
      //    SET "IsDeleted" = TRUE, "DeletedAt" = NOW()
      //    WHERE "EmployeeID" = $1`,
      //   [employeeId]
      // );
    }

    await client.query('COMMIT');
    return true;
  } catch (err) {
    await client.query('ROLLBACK');
    // Re-throw with a clearer message if FK constraint likely caused it
    if (err.code === '23503') {
      err.message = 'Delete blocked by foreign key constraints. Remove or reassign related records first, or enable ON DELETE CASCADE.';
    }
    throw err;
  } finally {
    client.release();
  }
}
