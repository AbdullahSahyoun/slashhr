// _organization/controllers/companyList.controller.js
import { listCompanies } from '../models/companyList.model.js';

export async function listCompaniesController(req, reply) {
  try {
    const db = req.pg || req.server.pg || req.server.app.pg;

    // optional pagination
    const limit = Math.max(1, Math.min(200, parseInt(req.query?.limit ?? 50, 10)));
    const offset = Math.max(0, parseInt(req.query?.offset ?? 0, 10));

    const data = await listCompanies(db, { limit, offset });
    return reply.send({ limit, offset, count: data.length, data });
  } catch (err) {
    req.log.error({ err }, 'listCompaniesController failed');
    return reply.code(500).send({ error: 'Failed to list companies' });
  }
}
