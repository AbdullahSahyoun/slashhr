// _organization/controllers/companyEmployees.controller.js
import { getEmployeesByCompanyId } from '../models/employeesByCompany.model.js';

export async function getEmployeesByCompanyIdController(req, reply) {
  try {
    const db = req.pg || req.server.pg || req.server.app.pg;
    const orgId = Number(req.params?.id);

    if (!Number.isFinite(orgId)) {
      return reply.code(400).send({ error: 'Invalid org id' });
    }

    const rows = await getEmployeesByCompanyId(db, orgId);
    return reply.send({ orgId, count: rows.length, data: rows });
  } catch (err) {
    req.log.error({ err }, 'getEmployeesByCompanyIdController failed');
    return reply.code(500).send({ error: 'Failed to get employees for company' });
  }
}
