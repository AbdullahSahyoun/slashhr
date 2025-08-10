export async function getEmployeeDocuments(db, employeeId) {
  const { rows } = await db.query(
    `
    SELECT 
        d."DocumentID",
        d."EmployeeID",
        e."Name" AS "EmployeeName",
        d."FileName",
        d."FilePath",
        d."DocumentType",
        d."UploadedAt"
    FROM organization."tblDocuments" d
    JOIN organization."tblEmployee" e 
        ON e."EmployeeID" = d."EmployeeID"
    WHERE d."EmployeeID" = $1
    ORDER BY d."UploadedAt" DESC
    `,
    [employeeId]
  );
  return rows;
}
