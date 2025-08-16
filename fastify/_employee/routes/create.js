// _employee/routes/create.js
export default async function employeeCreateRoutes(fastify) {
  fastify.post('/employee', {
    // onRequest: [fastify.authenticate], // uncomment if JWT protected
    schema: {
      tags: ['Employee'],
      summary: 'Create an employee',
      body: {
        type: 'object',
        required: ['firstName', 'lastName', 'establishment', 'contractTemplate', 'contractStart', 'jobTitle', 'department', 'login', 'workEmail'],
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          establishment: { type: 'string' },
          contractTemplate: { type: 'string' },
          contractStart: { type: 'string', format: 'date' },
          contractReason: { type: 'string', nullable: true },
          probationEnd1: { type: 'string', format: 'date', nullable: true },
          probationEnd2: { type: 'string', format: 'date', nullable: true },
          category: { type: 'string', nullable: true },
          employeeId: { type: 'string', nullable: true },
          contractEnd: { type: 'string', format: 'date', nullable: true },
          jobTitle: { type: 'string' },
          qualification: { type: 'string', nullable: true },
          department: { type: 'string' },
          manager: { type: 'string', nullable: true },
          isOwnManager: { type: 'boolean' },
          login: { type: 'string' },
          workEmail: { type: 'string' },
          personalEmail: { type: 'string', nullable: true },
          notifyByEmail: { type: 'boolean' },
          primaryRole: { type: 'string', nullable: true },
          secondaryRole: { type: 'string', nullable: true },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            employeeId: { type: 'integer' },
          },
        },
        400: { type: 'object', properties: { error: { type: 'string' } } },
        500: { type: 'object', properties: { error: { type: 'string' } } },
      },
    },
  }, async (req, reply) => {
    const client = await fastify.pg.connect();
    try {
      await client.query('BEGIN');
      const f = req.body;

      const { rows } = await client.query(
        `INSERT INTO employee (
          first_name, last_name, establishment, contract_template, contract_start,
          contract_reason, probation_end_1, probation_end_2, category, employee_id,
          contract_end, job_title, qualification, department, manager_id, is_own_manager,
          login_name, work_email, personal_email, notify_by_email, primary_role, secondary_role
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22
        ) RETURNING id`,
        [
          f.firstName, f.lastName, f.establishment, f.contractTemplate, f.contractStart,
          f.contractReason || null, f.probationEnd1 || null, f.probationEnd2 || null, f.category || null, f.employeeId || null,
          f.contractEnd || null, f.jobTitle, f.qualification || null, f.department, f.manager || null, f.isOwnManager ?? false,
          f.login, f.workEmail, f.personalEmail || null, f.notifyByEmail ?? false, f.primaryRole || null, f.secondaryRole || null
        ]
      );

      await client.query('COMMIT');
      return reply.code(201).send({ success: true, employeeId: rows[0].id });
    } catch (e) {
      await client.query('ROLLBACK');
      req.log.error(e);
      return reply.code(500).send({ error: 'Failed to create employee' });
    } finally {
      client.release();
    }
  });
}
