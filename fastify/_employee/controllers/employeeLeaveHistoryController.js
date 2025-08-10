// _employee/controllers/employeeLeaveHistoryController.js
import { getEmployeeLeaveHistory } from '../models/employeeLeaveHistory.js';

const isProd = process.env.NODE_ENV === 'production';

function getDb(req) {
  const db = req?.server?.db || req?.server?.pg;
  if (!db || typeof db.query !== 'function') {
    throw new Error('DB plugin missing: expected req.server.db or req.server.pg with a query() method.');
  }
  return db;
}

/**
 * GET /employee/:id/leave-history
 */
export async function listEmployeeLeaveHistory(req, reply) {
  try {
    const idParam = req.params?.id ?? req.params?.employeeId;
    const employeeId = Number(idParam);

    if (!Number.isInteger(employeeId) || employeeId <= 0) {
      return reply.code(400).send({ message: 'Invalid EmployeeID' });
    }

    const db = getDb(req);
    const items = await getEmployeeLeaveHistory(db, employeeId);

    return reply.send({ items, count: items.length, employeeId });
  } catch (err) {
    req.log?.error?.(err);
    return reply.code(500).send({
      message: 'Internal server error',
      ...(isProd ? {} : { error: String(err?.message || err) })
    });
  }
}
