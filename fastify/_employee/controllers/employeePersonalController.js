// _employee/controllers/employeePersonalController.js
import {
  getEmployeePersonal,
  listEmployeePersonal
} from '../models/employeePersonal.model.js';

const isProd = process.env.NODE_ENV === 'production';

function getDb(req) {
  const db = req?.server?.db || req?.server?.pg;
  if (!db || typeof db.query !== 'function') {
    throw new Error('DB plugin missing: expected req.server.db or req.server.pg with a query() method.');
  }
  return db;
}

/** GET /employee/:id/personal */
export async function getPersonal(req, reply) {
  try {
    const employeeId = Number(req.params?.id);
    if (!Number.isInteger(employeeId) || employeeId <= 0) {
      return reply.code(400).send({ message: 'Invalid EmployeeID' });
    }

    const db = getDb(req);
    const row = await getEmployeePersonal(db, employeeId);
    if (!row) return reply.code(404).send({ message: 'Employee not found' });

    return reply.send(row);
  } catch (err) {
    req.log?.error?.(err);
    return reply.code(500).send({
      message: 'Internal server error',
      ...(isProd ? {} : { error: String(err?.message || err) })
    });
  }
}

/** GET /employees/personal?limit=&offset= */
export async function listPersonal(req, reply) {
  try {
    const limit = Math.min(Math.max(parseInt(req.query?.limit ?? '20', 10) || 20, 1), 100);
    const offset = Math.max(parseInt(req.query?.offset ?? '0', 10) || 0, 0);

    const db = getDb(req);
    const rows = await listEmployeePersonal(db, { limit, offset });

    return reply.send({ items: rows, limit, offset, count: rows.length });
  } catch (err) {
    req.log?.error?.(err);
    return reply.code(500).send({
      message: 'Internal server error',
      ...(isProd ? {} : { error: String(err?.message || err) })
    });
  }
}
