// _employee/models/employeeLetterHistory.model.js

/**
 * Get letter history for a specific employee.
 * Returns: Lettertype, By, Date, Purpose, Recipient, Information, Status
 */
export async function getEmployeeLetterHistory(db, employeeId) {
  const { rows } = await db.query(
    `
    SELECT
      l."LetterType"   AS "Lettertype",
      l."By"           AS "By",
      l."Date"         AS "Date",
      l."Purpose"      AS "Purpose",
      l."Recipient"    AS "Recipient",
      l."Information"  AS "Information",
      l."Status"       AS "Status"
    FROM organization."tblLetterHistory" l
    WHERE l."EmployeeID" = $1
    ORDER BY l."Date" DESC
    `,
    [employeeId]
  );
  return rows;
}
