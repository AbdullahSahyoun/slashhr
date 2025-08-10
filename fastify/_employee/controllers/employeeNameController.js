// _employee/controllers/employeeNameController.js
import { getEmployeeName } from '../models/employeeName.model.js';

function getDb(req) {
  // Try req.server.db, then req.server.pg.pool, then req.server.pg
  return req?.server?.db || req?.server?.pg?.pool || req?.server?.pg;
}

export async function getEmployeeNameById(req, reply) {
  try {
    const employeeId = Number(req.params.id);
    if (!Number.isInteger(employeeId) || employeeId <= 0) {
      return reply.code(400).send({ error: 'Invalid employee ID' });
    }

    const db = getDb(req);
    const name = await getEmployeeName(db, employeeId);

    if (!name) {
      return reply.code(404).send({ error: `Employee with ID ${employeeId} not found.` });
    }

    return reply.send({ EmployeeID: employeeId, EmployeeName: name });
  } catch (err) {
    req.log?.error?.(err);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
