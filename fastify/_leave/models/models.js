// _leave/models/Model.js
// Data access for organization."tblLeave" (Fastify + @fastify/postgres)

const TABLE = 'organization."tblLeave"';
const COLS = `
  "LeaveID","TenantID","EmployeeID","StartTime","EndTime","Purpose","Status","CreatedAt"
`;

/** ──────────────────────────────────────────────────────────────
 *  SELECT
 *  ────────────────────────────────────────────────────────────── */
export async function getAllByTenant(fastify, tenantId) {
  const { rows } = await fastify.pg.query(
    `SELECT ${COLS} FROM ${TABLE}
     WHERE "TenantID" = $1
     ORDER BY "StartTime" DESC`,
    [tenantId]
  );
  return rows;
}

export async function getAllByEmployee(fastify, employeeId) {
  const { rows } = await fastify.pg.query(
    `SELECT ${COLS} FROM ${TABLE}
     WHERE "EmployeeID" = $1
     ORDER BY "StartTime" DESC`,
    [employeeId]
  );
  return rows;
}

export async function getById(fastify, leaveId) {
  const { rows } = await fastify.pg.query(
    `SELECT ${COLS} FROM ${TABLE}
     WHERE "LeaveID" = $1`,
    [leaveId]
  );
  return rows[0] || null;
}

/** ──────────────────────────────────────────────────────────────
 *  INSERT
 *  payload: { TenantID, EmployeeID, StartTime, EndTime, Purpose?, Status? }
 *  ────────────────────────────────────────────────────────────── */
export async function create(
  fastify,
  { TenantID, EmployeeID, StartTime, EndTime, Purpose = null, Status = 'Pending' }
) {
  const { rows } = await fastify.pg.query(
    `INSERT INTO ${TABLE}
      ("TenantID","EmployeeID","StartTime","EndTime","Purpose","Status")
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING ${COLS}`,
    [TenantID, EmployeeID, StartTime, EndTime, Purpose, Status]
  );
  return rows[0];
}

/** ──────────────────────────────────────────────────────────────
 *  UPDATE (by LeaveID)
 *  changes: { StartTime?, EndTime?, Purpose?, Status? }
 *  ────────────────────────────────────────────────────────────── */
export async function updateById(fastify, leaveId, changes = {}) {
  const sets = [];
  const params = [];

  if (changes.StartTime !== undefined) { params.push(changes.StartTime); sets.push(`"StartTime" = $${params.length}`); }
  if (changes.EndTime   !== undefined) { params.push(changes.EndTime);   sets.push(`"EndTime"   = $${params.length}`); }
  if (changes.Purpose   !== undefined) { params.push(changes.Purpose);   sets.push(`"Purpose"   = $${params.length}`); }
  if (changes.Status    !== undefined) { params.push(changes.Status);    sets.push(`"Status"    = $${params.length}`); }

  if (!sets.length) return await getById(fastify, leaveId);

  params.push(leaveId);
  const { rows } = await fastify.pg.query(
    `UPDATE ${TABLE}
        SET ${sets.join(', ')}
      WHERE "LeaveID" = $${params.length}
      RETURNING ${COLS}`,
    params
  );
  return rows[0] || null;
}

/** ──────────────────────────────────────────────────────────────
 *  DELETE (by LeaveID)
 *  ────────────────────────────────────────────────────────────── */
export async function removeById(fastify, leaveId) {
  const { rows } = await fastify.pg.query(
    `DELETE FROM ${TABLE}
      WHERE "LeaveID" = $1
      RETURNING ${COLS}`,
    [leaveId]
  );
  return rows[0] || null;
}
