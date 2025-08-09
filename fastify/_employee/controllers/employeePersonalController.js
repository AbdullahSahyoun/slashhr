// controllers/employeeProfessionalController.js
import { getEmployeeProfessionalInfo } from '../models/model.js';

export async function getEmployeeProfessionalById(request, reply) {
  const employeeId = parseInt(request.params.employeeId, 10);
  if (isNaN(employeeId)) {
    return reply.code(400).send({ error: 'Invalid employee ID' });
  }

  try {
    const employee = await getEmployeeProfessionalInfo(request.server.pg, employeeId);

    if (!employee) {
      return reply.code(404).send({ error: 'Employee not found' });
    }

    return reply.send(employee);
  } catch (err) {
    request.log.error(err); // سجل الخطأ في logs
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}
