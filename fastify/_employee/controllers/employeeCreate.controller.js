// _employee/controllers/employeeCreate.controller.js
import { createEmployee } from '../models/employeeCreate.model.js';

export async function createEmployeeController(request, reply) {
  try {
    const body = request.body || {};

    // Basic runtime checks (you can move these to Fastify schema on the route)
    const required = ['tenantId', 'orgId', 'firstName', 'workEmail', 'positionId', 'departmentId', 'officeId', 'joiningDate'];
    const missing = required.filter((k) => body[k] === undefined || body[k] === null || body[k] === '');
    if (missing.length) {
      return reply.code(400).send({ error: `Missing required fields: ${missing.join(', ')}` });
    }

    const db = request.pg || request.server.pg;

    const created = await createEmployee(db, {
      tenantId: Number(body.tenantId),
      orgId: Number(body.orgId),
      firstName: String(body.firstName).trim(),
      workEmail: String(body.workEmail).trim(),

      positionId: Number(body.positionId),
      departmentId: Number(body.departmentId),
      officeId: Number(body.officeId),
      joiningDate: body.joiningDate, // 'YYYY-MM-DD' or ISO

      preferredName: body.preferredName ?? null,
      managerId: body.managerId ? Number(body.managerId) : null,
      isOwnManager: Boolean(body.isOwnManager),
      employmentTypeId: body.employmentTypeId ? Number(body.employmentTypeId) : null,
      workModeId: body.workModeId ? Number(body.workModeId) : null,

      nationality: body.nationality ?? null,
      maritalStatus: body.maritalStatus ?? null,
      phoneNumber: body.phoneNumber ?? null,
      cin: body.cin ?? null,
      personalAddress: body.personalAddress ?? null,
      dateOfBirth: body.dateOfBirth ?? null,
      gender: body.gender ?? null,

      employeeCode: body.employeeCode ?? null,
    });

    return reply.code(201).send(created);
  } catch (err) {
    const status = err.statusCode || 500;
    return reply.code(status).send({ error: err.message || 'Internal Server Error' });
  }
}
