// _employee/controllers/employeeProfessionalController.js
import { getEmployeeProfessional } from '../models/employeeProfessional.model.js';

const isProd = process.env.NODE_ENV === 'production';

function getDb(req) {
  const db = req?.server?.db || req?.server?.pg;
  if (!db || typeof db.query !== 'function') {
    throw new Error('DB plugin missing: expected req.server.db or req.server.pg with a query() method.');
  }
  return db;
}

/**
 * GET /employee/:id/professional
 */
export async function getProfessional(req, reply) {
  try {
    const employeeId = Number(req.params?.id);
    if (!Number.isInteger(employeeId) || employeeId <= 0) {
      return reply.code(400).send({ message: 'Invalid EmployeeID' });
    }

    const db = getDb(req);
    const row = await getEmployeeProfessional(db, employeeId);
    if (!row) {
      return reply.code(404).send({ message: `Employee with ID ${employeeId} not found.` });
    }

    return reply.send(row);
  } catch (err) {
    req.log?.error?.(err);
    return reply.code(500).send({
      message: 'Internal server error',
      ...(isProd ? {} : { error: String(err?.message || err) })
    });
  }
}
