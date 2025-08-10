// _organization/models/companyList.model.js
export async function listCompanies(db, { limit = 50, offset = 0 } = {}) {
  const query = `
    SELECT 
      "OrgID",
      "TenantID",
      "Name" AS "OrgName",
      "Description",
      "CreatedAt"
    FROM organization."tblOrganisation"
    ORDER BY "CreatedAt" DESC
    LIMIT $1 OFFSET $2
  `;

  const { rows } = await db.query(query, [limit, offset]);
  return rows;
}
