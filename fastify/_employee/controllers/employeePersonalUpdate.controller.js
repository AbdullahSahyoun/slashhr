// _employee/controllers/employeePersonalUpdate.controller.js
import { updateEmployeePersonal } from '../models/employeePersonalUpdate.model.js';

export async function updatePersonal(request, reply) {
  try {
    const employeeId = Number(request.params.id);
    if (!Number.isInteger(employeeId)) {
      return reply.code(400).send({ error: 'Invalid EmployeeID' });
    }

    const db = request.pg || request.server.pg; // compatible with your DB plugin
    const payload = request.body || {};

    const updated = await updateEmployeePersonal(db, employeeId, {
      firstName: payload.firstName,
      personalEmail: payload.personalEmail,

      preferredName: payload.preferredName,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,      // 'YYYY-MM-DD' or ISO
      nationality: payload.nationality,
      maritalStatus: payload.maritalStatus,
      phoneNumber: payload.phoneNumber,
      cin: payload.cin,
      personalAddress: payload.personalAddress,
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
