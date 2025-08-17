// _catalog/models/DepartmentManager.model.js
export async function getByDepartmentId(fastify, departmentId) {
  const sql = `
    SELECT
      e."EmployeeID" AS id,
      e."Name"       AS label     -- 👈 alias to 'label' to match schema
    FROM organization.department_managers dm
    JOIN organization."tblEmployee" e
      ON e."EmployeeID" = dm.employee_id
    WHERE dm.department_id = $1
      AND dm.is_active = TRUE
    ORDER BY e."Name";
  `;
  const { rows } = await fastify.pg.query(sql, [Number(departmentId)]);
  return rows; // [{ id, label }]
}
