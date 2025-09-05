// _leave/controllers/controllers.js
// Leave controllers: thin logic + validation, call _leave/models/models.js

import * as Leave from '../models/models.js';

/** GET /leaves/tenant/:tenantId */
export async function listByTenant(fastify, req, reply) {
  const tenantId = Number(req.params.tenantId);
  if (!tenantId) return reply.code(400).send({ message: 'tenantId is required' });

  const rows = await Leave.getAllByTenant(fastify, tenantId);
  return rows;
}

/** GET /leaves/employee/:employeeId */
export async function listByEmployee(fastify, req, reply) {
  const employeeId = Number(req.params.employeeId);
  if (!employeeId) return reply.code(400).send({ message: 'employeeId is required' });

  const rows = await Leave.getAllByEmployee(fastify, employeeId);
  return rows;
}

/** GET /leaves/:id */
export async function get(fastify, req, reply) {
  const id = Number(req.params.id);
  if (!id) return reply.code(400).send({ message: 'leave id is required' });

  const item = await Leave.getById(fastify, id);
  if (!item) return reply.code(404).send({ message: 'Leave not found' });
  return item;
}

/** POST /leaves 
 *  body: { TenantID, EmployeeID, StartTime, EndTime, Purpose?, Status? }
 */
export async function create(fastify, req, reply) {
  const { TenantID, EmployeeID, StartTime, EndTime, Purpose, Status } = req.body ?? {};
  if (!TenantID || !EmployeeID || !StartTime || !EndTime) {
    return reply.code(400).send({
      message: 'TenantID, EmployeeID, StartTime, EndTime are required',
    });
  }

  const created = await Leave.create(fastify, {
    TenantID: Number(TenantID),
    EmployeeID: Number(EmployeeID),
    StartTime,
    EndTime,
    Purpose: Purpose ?? null,
    Status: Status ?? 'Pending',
  });

  return reply.code(201).send(created);
}

/** PATCH /leaves/update/:id   (route calls ctrl.update)
 *  body: { Status }  // ONLY status is allowed
 */
// _leave/controllers/controllers.js
export async function update(fastify, req, reply) {
  const id = Number(req.params.id);
  const { Status } = req.body ?? {};

  const allowed = ['Pending', 'Approved', 'Rejected'];
  if (!id) return reply.code(400).send({ message: 'leave id is required' });
  if (!allowed.includes(Status)) {
    return reply.code(400).send({ message: 'Status must be Pending, Approved, or Rejected' });
  }

  try {
    // If you switched to model helper:
    // const updated = await Leave.updateStatusById(fastify, id, Status);
    const { rows, rowCount } = await fastify.pg.query(
      `UPDATE organization."tblLeave"
         SET "Status" = $1
       WHERE "LeaveID" = $2
       RETURNING "LeaveID","TenantID","EmployeeID","StartTime","EndTime","Purpose","Status","CreatedAt"`,
      [Status, id]
    );
    if (rowCount === 0) return reply.code(404).send({ message: 'Leave not found' });

    const updated = rows[0];
    return reply.send(updated);
  } catch (err) {
    req.log?.error(err);
    // DEV-ONLY: expose details to debug. Remove in prod.
    return reply.code(500).send({
      message: 'Database error',
      code: err.code,
      detail: err.detail,
      hint: err.hint,
      where: err.where
    });
  }
}

/** DELETE /leaves/:id */
export async function remove(fastify, req, reply) {
  const id = Number(req.params.id);
  if (!id) return reply.code(400).send({ message: 'leave id is required' });

  const deleted = await Leave.removeById(fastify, id);
  if (!deleted) return reply.code(404).send({ message: 'Leave not found' });
  return { message: 'Deleted', deleted };
}
