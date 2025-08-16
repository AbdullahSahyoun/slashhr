// _employee/controllers/employeeDepartmentsController.js
import { listDepartments } from '../models/employeeDepartments.model.js';

const isProd = process.env.NODE_ENV === 'production';

function getDb(req) {
  const db = req?.server?.db || req?.server?.pg;
  if (!db || typeof db.query !== 'function') {
    throw new Error('DB plugin missing: expected req.server.db or req.server.pg with a query() method.');
  }
  return db;
}

/** GET /employee/company/:orgId/departments */
export async function getDepartments(req, reply) {
  try {
    const orgId = Number(req.params?.orgId);
    if (!Number.isInteger(orgId) || orgId <= 0) {
      return reply.code(400).send({ message: 'Invalid OrgID' });
    }

    const db = getDb(req);
    const departments = await listDepartments(db, orgId);
    return reply.send(departments); // array of strings
  } catch (err) {
    req.log?.error?.(err);
    return reply.code(500).send({
      message: 'Internal server error',
      ...(isProd ? {} : { error: String(err?.message || err) })
    });
  }
}
