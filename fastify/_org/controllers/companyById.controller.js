// _organization/controllers/companyById.controller.js
import { getCompanyById } from '../models/companyById.model.js';

export async function getCompanyByIdController(req, reply) {
  try {
    const db = req.pg || req.server.pg || req.server.app.pg;
    const orgId = Number(req.params?.id);

    if (!Number.isFinite(orgId)) {
      return reply.code(400).send({ error: 'Invalid org id' });
    }

    const row = await getCompanyById(db, orgId);
    if (!row) return reply.code(404).send({ error: 'Company not found' });

    return reply.send(row);
  } catch (err) {
    req.log.error({ err }, 'getCompanyByIdController failed');
    return reply.code(500).send({ error: 'Failed to get company' });
  }
}
