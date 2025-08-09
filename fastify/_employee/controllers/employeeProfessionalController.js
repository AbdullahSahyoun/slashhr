import { getEmployeeProfessionalInfo } from '../models/model.js';

export async function getEmployeeProfessionalById(req, reply) {
  try {
    const employeeId = parseInt(req.params.employeeId, 10);

    if (isNaN(employeeId)) {
      return reply.code(400).send({ error: 'Invalid employee ID' });
    }

    const db = req.server.db; // ⬅️ تأكد أن db معرف هنا
    const result = await getEmployeeProfessionalInfo(db, employeeId);

    if (!result) {
      return reply.code(404).send({ error: `Employee with ID ${employeeId} not found.` });
    }

    return reply.send(result);

  } catch (err) {
    console.error('🔥 Server Error in getEmployeeProfessionalById:', err);
    return reply.code(500).send({ error: 'Internal server error' });
  }
}
