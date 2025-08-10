// _organization/models/companyById.model.js
export async function getCompanyById(db, orgId) {
  const query = `
    SELECT 
      "OrgID",
      "TenantID",
      "Name" AS "OrgName",
      "Description",
      "CreatedAt"
    FROM organization."tblOrganisation"
    WHERE "OrgID" = $1
  `;

  const { rows } = await db.query(query, [orgId]);
  return rows[0] ?? null;
}
