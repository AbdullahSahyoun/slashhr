// _employee/models/employeeDepartments.model.js

/**
 * Try to load distinct Department names for a company (OrgID).
 * If a department lookup table exists (organization."tblDepartment"),
 * we return names from there. Otherwise, fallback to distinct DepartmentID.
 */
export async function listDepartments(db, orgId) {
  // First, attempt using a lookup table (most common schema)
  // organization."tblDepartment" with columns: "DepartmentID", "Name"
  const tryWithLookup = `
    SELECT DISTINCT d."Name" AS "Department"
    FROM organization."tblEmployee" e
    LEFT JOIN organization."tblDepartment" d
      ON e."DepartmentID" = d."DepartmentID"
    WHERE e."OrgID" = $1
    ORDER BY d."Name" ASC NULLS LAST
  `;

  try {
    const { rows } = await db.query(tryWithLookup, [orgId]);
    const names = rows.map(r => r.Department).filter(v => v && String(v).trim() !== '');
    if (names.length > 0) return names;
  } catch {
    // Table may not exist — fall through to fallback
  }

  // Fallback: no lookup table; return "Department {ID}" or just the ID as string
  const fallbackSql = `
    SELECT DISTINCT e."DepartmentID"
    FROM organization."tblEmployee" e
    WHERE e."OrgID" = $1
    ORDER BY e."DepartmentID" ASC NULLS LAST
  `;
  const { rows: fallbackRows } = await db.query(fallbackSql, [orgId]);

  // Return readable labels; you can change to String(id) if you prefer raw IDs
  return fallbackRows
    .map(r => r.DepartmentID)
    .filter(v => v !== null && v !== undefined)
    .map(id => `Department ${id}`);
}
