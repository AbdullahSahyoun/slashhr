// _employee/controllers/employeeDelete.controller.js
import { deleteEmployee } from '../models/employeeDelete.model.js';

export async function deleteEmployeeController(request, reply) {
  try {
    const employeeId = Number(request.params.id);
    if (!Number.isInteger(employeeId)) {
      return reply.code(400).send({ error: 'Invalid EmployeeID' });
    }

    const db = request.pg || request.server.pg;

    // You can read options from query if you want:
    // const hard = request.query?.hard !== 'false';
    // const deleteUser = request.query?.deleteUser !== 'false';
    const hard = true;
    const deleteUser = true;

    const ok = await deleteEmployee(db, employeeId, { hard, deleteUser });
    if (!ok) {
      return reply.code(404).send({ error: 'Employee not found' });
    }

    return reply.code(204).send(); // No Content
  } catch (err) {
    const status = err.statusCode || 500;
    return reply.code(status).send({ error: err.message || 'Internal Server Error' });
  }
}
