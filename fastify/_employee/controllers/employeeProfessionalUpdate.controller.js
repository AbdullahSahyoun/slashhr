// _employee/controllers/employeeProfessionalUpdate.controller.js
import { updateEmployeeProfessional } from '../models/employeeProfessionalUpdate.model.js';

export async function updateProfessional(request, reply) {
  try {
    const employeeId = Number(request.params.id);
    if (!Number.isInteger(employeeId)) {
      return reply.code(400).send({ error: 'Invalid EmployeeID' });
    }

    const db = request.pg || request.server.pg;
    const payload = request.body || {};

    const updated = await updateEmployeeProfessional(db, employeeId, {
      positionId: payload.positionId,
      departmentId: payload.departmentId,
      managerId: payload.managerId,
      officeId: payload.officeId,
      joiningDate: payload.joiningDate,
      employmentTypeId: payload.employmentTypeId,
      workModeId: payload.workModeId,
    });

    if (!updated) {
      return reply.code(404).send({ error: 'Employee not found' });
    }

    return reply.send(updated);
  } catch (err) {
    const status = err.statusCode || 500;
    return reply.code(status).send({ error: err.message || 'Internal Server Error' });
  }
}
