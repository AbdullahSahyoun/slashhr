// employee/controllers/EmployeeController.js

import * as EmployeeModel from '../models/model.js';

/**
 * GET /employee
 * Get all employees
 */
export async function getAll(request, reply) {
  try {
    const employees = await EmployeeModel.getAllEmployees(request.server.pg);
    reply.send(employees);
  } catch (err) {
    request.log.error(err);
    reply.code(500).send({ error: 'Failed to fetch employees' });
  }
}

/**
 * GET /employee/:id
 * Get single employee by ID
 */
export async function getById(request, reply) {
  const { id } = request.params;
  try {
    const employee = await EmployeeModel.getEmployeeById(request.server.pg, id);
    if (!employee) return reply.code(404).send({ error: 'Employee not found' });
    reply.send(employee);
  } catch (err) {
    request.log.error(err);
    reply.code(500).send({ error: 'Failed to fetch employee' });
  }
}

/**
 * POST /employee
 * Create new employee
 */
export async function create(request, reply) {
  const data = request.body;
  try {
    const result = await EmployeeModel.createEmployee(request.server.pg, data);
    reply.code(201).send({
      message: 'Employee created successfully',
      EmployeeID: result.EmployeeID
    });
  } catch (err) {
    request.log.error(err);
    reply.code(500).send({ error: 'Failed to create employee' });
  }
}

/**
 * PUT /employee/:id
 * Update existing employee
 */
export async function update(request, reply) {
  const { id } = request.params;
  const updateData = request.body;
  try {
    const updated = await EmployeeModel.updateEmployee(request.server.pg, id, updateData);
    if (!updated) return reply.code(404).send({ error: 'Employee not found' });
    reply.send({ message: 'Employee updated successfully' });
  } catch (err) {
    request.log.error(err);
    reply.code(500).send({ error: 'Failed to update employee' });
  }
}

/**
 * DELETE /employee/:id
 * Delete employee
 */
export async function remove(request, reply) {
  const { id } = request.params;
  try {
    const deleted = await EmployeeModel.deleteEmployee(request.server.pg, id);
    if (!deleted) return reply.code(404).send({ error: 'Employee not found' });
    reply.send({ message: 'Employee deleted successfully' });
  } catch (err) {
    request.log.error(err);
    reply.code(500).send({ error: 'Failed to delete employee' });
  }
}