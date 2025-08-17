// _catalog/models/SelectEmployee.model.js
export async function selectByOrgId(pg, orgId) {
  try {
    const query = `
      SELECT 
        "EmployeeID"   AS id,
        "Name"         AS name,
        COALESCE("PhotoUrl", '') AS photo
      FROM "user"."Employee"
      WHERE "OrgID" = $1
      ORDER BY "Name" ASC
    `;
    const { rows } = await pg.query(query, [orgId]);
    return rows ?? [];
  } catch (err) {
    console.error('Error in selectByOrgId:', err);
    throw err;
  }
}
