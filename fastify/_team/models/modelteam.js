// modelteam.js
// Teams = Departments model for SlashHR
// Uses organization.departments (teams), organization."tblEmployee" (members), organization.department_managers (leaders)
// Schema refs: departments, tblEmployee, department_managers 

module.exports = function TeamModel(fastify) {
  const pg = fastify.pg;

  /* =========================
   * Teams (Departments)
   * ========================= */

  // List teams with counts
  async function listTeams({ tenantId, search }) {
    const params = [tenantId];
    let where = `d."TenantID" = $1`;
    if (search) {
      params.push(`%${search}%`);
      where += ` AND d.department_name ILIKE $${params.length}`;
    }

    const sql = `
      SELECT
        d.id                AS id,
        d.department_name   AS name,
        d.is_active         AS is_active,
        COALESCE(m.member_count, 0)  AS member_count,
        COALESCE(l.leader_count, 0)  AS leader_count
      FROM organization.departments d
      LEFT JOIN (
        SELECT e."DepartmentID" AS dept_id, COUNT(*) AS member_count
        FROM organization."tblEmployee" e
        WHERE e."TenantID" = $1
        GROUP BY e."DepartmentID"
      ) m ON m.dept_id = d.id
      LEFT JOIN (
        SELECT department_id, COUNT(*) AS leader_count
        FROM organization.department_managers
        WHERE "TenantID" = $1
        GROUP BY department_id
      ) l ON l.department_id = d.id
      WHERE ${where}
      ORDER BY lower(d.department_name) ASC;
    `;
    const { rows } = await pg.query(sql, params);
    return rows;
  }

  // Get single team
  async function getTeamById({ tenantId, teamId }) {
    const sql = `
      SELECT id AS id, department_name AS name, is_active
      FROM organization.departments
      WHERE "TenantID" = $1 AND id = $2
      LIMIT 1;
    `;
    const { rows } = await pg.query(sql, [tenantId, teamId]);
    return rows[0] || null;
  }

  // Create team
  async function createTeam({ tenantId, name }) {
    const sql = `
      INSERT INTO organization.departments ("TenantID", department_name, is_active)
      VALUES ($1, $2, true)
      RETURNING id, department_name AS name, is_active;
    `;
    const { rows } = await pg.query(sql, [tenantId, String(name).trim()]);
    return rows[0];
  }

  // Update team
  async function updateTeam({ tenantId, teamId, name, is_active }) {
    const fields = [];
    const params = [tenantId, teamId];
    if (typeof name === 'string') {
      params.push(name.trim());
      fields.push(`department_name = $${params.length}`);
    }
    if (typeof is_active === 'boolean') {
      params.push(is_active);
      fields.push(`is_active = $${params.length}`);
    }
    if (!fields.length) return await getTeamById({ tenantId, teamId });

    const sql = `
      UPDATE organization.departments
         SET ${fields.join(', ')}
       WHERE "TenantID" = $1 AND id = $2
       RETURNING id, department_name AS name, is_active;
    `;
    const { rows } = await pg.query(sql, params);
    return rows[0] || null;
  }

  // Soft delete (deactivate) a team
  async function deleteTeam({ tenantId, teamId }) {
    const sql = `
      UPDATE organization.departments
         SET is_active = false
       WHERE "TenantID" = $1 AND id = $2
       RETURNING id, department_name AS name, is_active;
    `;
    const { rows } = await pg.query(sql, [tenantId, teamId]);
    return rows[0] || null;
  }

  /* =========================
   * Leaders (department_managers)
   * ========================= */

  // List team leaders
  async function listLeaders({ tenantId, teamId }) {
    const sql = `
      SELECT dm.employee_id AS employeeId, e."Name" AS name
      FROM organization.department_managers dm
      JOIN organization."tblEmployee" e
        ON e."EmployeeID" = dm.employee_id AND e."TenantID" = dm."TenantID"
      WHERE dm."TenantID" = $1 AND dm.department_id = $2
      ORDER BY dm.employee_id ASC;
    `;
    const { rows } = await pg.query(sql, [tenantId, teamId]);
    return rows;
  }

  // Add team leader (idempotent because of unique constraint)
  async function addLeader({ tenantId, teamId, employeeId }) {
    const sql = `
      INSERT INTO organization.department_managers ("TenantID", department_id, employee_id, is_active)
      VALUES ($1, $2, $3, true)
      ON CONFLICT ("TenantID", department_id, employee_id) DO UPDATE
        SET is_active = EXCLUDED.is_active
      RETURNING id, department_id AS teamId, employee_id AS employeeId, is_active;
    `;
    const { rows } = await pg.query(sql, [tenantId, teamId, employeeId]);
    return rows[0];
  }

  // Remove team leader
  async function removeLeader({ tenantId, teamId, employeeId }) {
    const sql = `
      DELETE FROM organization.department_managers
      WHERE "TenantID" = $1 AND department_id = $2 AND employee_id = $3
      RETURNING id;
    `;
    const { rows } = await pg.query(sql, [tenantId, teamId, employeeId]);
    return !!rows[0];
  }

  /* =========================
   * Members (tblEmployee)
   * ========================= */

  // List members of a team
  async function listMembers({ tenantId, teamId, search }) {
    const params = [tenantId, teamId];
    let where = `e."TenantID" = $1 AND e."DepartmentID" = $2`;
    if (search) {
      params.push(`%${search}%`);
      where += ` AND e."Name" ILIKE $${params.length}`;
    }
    const sql = `
      SELECT e."EmployeeID" AS id, e."Name" AS name, e."DepartmentID" AS departmentId
      FROM organization."tblEmployee" e
      WHERE ${where}
      ORDER BY e."EmployeeID" ASC;
    `;
    const { rows } = await pg.query(sql, params);
    return rows;
  }

  // Add/move a member to a team
  async function addMember({ tenantId, teamId, employeeId }) {
    const sql = `
      UPDATE organization."tblEmployee"
         SET "DepartmentID" = $3
       WHERE "TenantID" = $1 AND "EmployeeID" = $2
       RETURNING "EmployeeID" AS id, "Name" AS name, "DepartmentID" AS departmentId;
    `;
    const { rows } = await pg.query(sql, [tenantId, employeeId, teamId]);
    return rows[0] || null;
  }

  // Remove member from a team (clear DepartmentID)
  async function removeMember({ tenantId, employeeId }) {
    const sql = `
      UPDATE organization."tblEmployee"
         SET "DepartmentID" = NULL
       WHERE "TenantID" = $1 AND "EmployeeID" = $2
       RETURNING "EmployeeID" AS id, "Name" AS name, "DepartmentID" AS departmentId;
    `;
    const { rows } = await pg.query(sql, [tenantId, employeeId]);
    return rows[0] || null;
  }

  // List all employees in tenant, flag if in team (and exclude team leaders of that team)
  async function listEmployeesWithTeamFlagExcludeLeaders({ tenantId, teamId, search }) {
    const params = [tenantId, teamId];
    let where = `e."TenantID" = $1`;
    if (search) {
      params.push(`%${search}%`);
      where += ` AND e."Name" ILIKE $${params.length}`;
    }

    const sql = `
      SELECT
        e."EmployeeID"              AS id,
        e."Name"                    AS name,
        e."DepartmentID"            AS departmentId,
        (e."DepartmentID" = $2)     AS in_team,
        (dm.employee_id IS NOT NULL) AS is_team_leader
      FROM organization."tblEmployee" e
      LEFT JOIN organization.department_managers dm
        ON dm.employee_id = e."EmployeeID"
       AND dm.department_id = $2
       AND dm."TenantID"   = e."TenantID"
      WHERE ${where}
        AND dm.employee_id IS NULL   -- exclude leaders
      ORDER BY e."EmployeeID" ASC;
    `;
    const { rows } = await pg.query(sql, params);
    return rows;
  }

  // Same as above but includes leaders
  async function listEmployeesWithTeamFlag({ tenantId, teamId, search }) {
    const params = [tenantId, teamId];
    let where = `e."TenantID" = $1`;
    if (search) {
      params.push(`%${search}%`);
      where += ` AND e."Name" ILIKE $${params.length}`;
    }

    const sql = `
      SELECT
        e."EmployeeID"              AS id,
        e."Name"                    AS name,
        e."DepartmentID"            AS departmentId,
        (e."DepartmentID" = $2)     AS in_team,
        (dm.employee_id IS NOT NULL) AS is_team_leader
      FROM organization."tblEmployee" e
      LEFT JOIN organization.department_managers dm
        ON dm.employee_id = e."EmployeeID"
       AND dm.department_id = $2
       AND dm."TenantID"   = e."TenantID"
      WHERE ${where}
      ORDER BY e."EmployeeID" ASC;
    `;
    const { rows } = await pg.query(sql, params);
    return rows;
  }

  return {
    // teams
    listTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
    // leaders
    listLeaders,
    addLeader,
    removeLeader,
    // members
    listMembers,
    addMember,
    removeMember,
    // helpers for UI add-members modal etc.
    listEmployeesWithTeamFlagExcludeLeaders,
    listEmployeesWithTeamFlag,
  };
};
