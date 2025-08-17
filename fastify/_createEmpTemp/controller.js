// _createEmpTemp/controller.js
import { createUserAndEmployee } from './models.js';

export async function createEmpTempController(req, reply) {
  try {
    const tenantId = req.user?.TenantID ?? req.body?.tenantId ?? 1; // pick your source
    const result = await createUserAndEmployee(req.server, tenantId, req.body);

    return reply.code(201).send({
      message: 'User and Employee created',
      user: result.user,
      employee: result.employee
    });
  } catch (e) {
    req.log.error(e);
    return reply.code(400).send({ error: e.message || 'Failed to create employee' });
  }
}
