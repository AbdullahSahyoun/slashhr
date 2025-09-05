// _team/routes/routes.js

export default async function teamRoutes(fastify) {
  /* =========================
   * EXISTING ROUTES (unchanged)
   * ========================= */

  // Example: list all teams
  fastify.get('/', {
    schema: {
      tags: ['Team'],
      summary: 'List teams',
      response: {
        200: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  is_active: { type: 'boolean' }
                }
              }
            }
          }
        }
      }
    }
  }, async (req, reply) => {
    const { rows } = await fastify.pg.query(`
      SELECT id, department_name AS name, 'Team for department ' || department_name AS description, is_active
      FROM organization.departments
      WHERE "TenantID" = 1
      ORDER BY id ASC;
    `);
    return { items: rows };
  });

  // Example: create a team
  fastify.post('/', {
    schema: {
      tags: ['Team'],
      summary: 'Create a new team',
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            team: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, async (req, reply) => {
    const { name, description } = req.body;
    const { rows } = await fastify.pg.query(
      `INSERT INTO organization.departments ("TenantID", department_name, is_active, created_at, updated_at)
       VALUES ($1, $2, true, NOW(), NOW())
       RETURNING id, department_name AS name, $3::text AS description;`,
      [1, name, description || null]
    );
    return reply.code(201).send({ team: rows[0] });
  });

  /* =========================
   * NEW ROUTES (additive)
   * ========================= */

  // GET /employees-flag?tenantId=&teamId=&search=&excludeLeaders=
  fastify.get('/employees-flag', {
    schema: {
      tags: ['Team'],
      summary: 'List all employees in a tenant with team flag (optionally exclude leaders)',
      querystring: {
        type: 'object',
        required: ['tenantId', 'teamId'],
        properties: {
          tenantId: { type: 'integer' },
          teamId: { type: 'integer' },
          search: { type: 'string' },
          excludeLeaders: { type: 'boolean', default: true }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },              // EmployeeID
                  name: { type: 'string' },              // Name
                  departmentId: { type: 'integer', nullable: true },
                  in_team: { type: 'boolean' },          // departmentId == teamId
                  is_team_leader: { type: 'boolean' }    // leader of that department
                }
              }
            }
          }
        }
      }
    }
  }, async (req, reply) => {
    const { tenantId, teamId, search, excludeLeaders = true } = req.query;

    const params = [tenantId, teamId];
    let where = `e."TenantID" = $1`;
    if (search) {
      params.push(`%${search}%`);
      where += ` AND e."Name" ILIKE $${params.length}`;
    }

    const sql = `
      SELECT
        e."EmployeeID"               AS id,
        e."Name"                     AS name,
        e."DepartmentID"             AS "departmentId",
        (e."DepartmentID" = $2)      AS in_team,
        (dm.employee_id IS NOT NULL) AS is_team_leader
      FROM organization."tblEmployee" e
      LEFT JOIN organization.department_managers dm
        ON dm.employee_id = e."EmployeeID"
       AND dm.department_id = $2
       AND dm."TenantID"   = e."TenantID"
      WHERE ${where}
      ${excludeLeaders ? 'AND dm.employee_id IS NULL' : ''}
      ORDER BY e."EmployeeID" ASC;
    `;

    const { rows } = await fastify.pg.query(sql, params);
    return { items: rows };
  });

  // GET /:teamId/leaders?tenantId=
  fastify.get('/leaders/:teamId', {
    schema: {
      tags: ['Team'],
      summary: 'List team leaders',
      params: {
        type: 'object',
        required: ['teamId'],
        properties: { teamId: { type: 'integer' } }
      },
      querystring: {
        type: 'object',
        required: ['tenantId'],
        properties: { tenantId: { type: 'integer' } }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  employeeId: { type: 'integer' },
                  name: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }, async (req, reply) => {
    const { tenantId } = req.query;
    const { teamId } = req.params;

    const { rows } = await fastify.pg.query(`
      SELECT dm.employee_id AS "employeeId", e."Name" AS name
      FROM organization.department_managers dm
      JOIN organization."tblEmployee" e
        ON e."EmployeeID" = dm.employee_id AND e."TenantID" = dm."TenantID"
      WHERE dm."TenantID" = $1 AND dm.department_id = $2
      ORDER BY dm.employee_id ASC;
    `, [tenantId, teamId]);

    return { items: rows };
  });

  // POST /:teamId/leaders  { tenantId, employeeId }
  fastify.post('/:teamId/leaders', {
    schema: {
      tags: ['Team'],
      summary: 'Add a team leader',
      params: {
        type: 'object',
        required: ['teamId'],
        properties: { teamId: { type: 'integer' } }
      },
      body: {
        type: 'object',
        required: ['tenantId', 'employeeId'],
        properties: {
          tenantId: { type: 'integer' },
          employeeId: { type: 'integer' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            leader: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                teamId: { type: 'integer' },
                employeeId: { type: 'integer' },
                is_active: { type: 'boolean' }
              }
            }
          }
        }
      }
    }
  }, async (req, reply) => {
    const { teamId } = req.params;
    const { tenantId, employeeId } = req.body;

    const { rows } = await fastify.pg.query(`
      INSERT INTO organization.department_managers ("TenantID", department_id, employee_id, is_active)
      VALUES ($1, $2, $3, true)
      ON CONFLICT ("TenantID", department_id, employee_id) DO UPDATE
        SET is_active = EXCLUDED.is_active
      RETURNING id, department_id AS "teamId", employee_id AS "employeeId", is_active;
    `, [tenantId, teamId, employeeId]);

    return reply.code(201).send({ leader: rows[0] });
  });

  // DELETE /:teamId/leaders/:employeeId?tenantId=
  fastify.delete('/:teamId/leaders/:employeeId', {
    schema: {
      tags: ['Team'],
      summary: 'Remove a team leader',
      params: {
        type: 'object',
        required: ['teamId', 'employeeId'],
        properties: {
          teamId: { type: 'integer' },
          employeeId: { type: 'integer' }
        }
      },
      querystring: {
        type: 'object',
        required: ['tenantId'],
        properties: { tenantId: { type: 'integer' } }
      },
      response: {
        200: {
          type: 'object',
          properties: { ok: { type: 'boolean' } }
        }
      }
    }
  }, async (req, reply) => {
    const { tenantId } = req.query;
    const { teamId, employeeId } = req.params;

    const { rows } = await fastify.pg.query(`
      DELETE FROM organization.department_managers
      WHERE "TenantID" = $1 AND department_id = $2 AND employee_id = $3
      RETURNING id;
    `, [tenantId, teamId, employeeId]);

    return { ok: !!rows[0] };
  });

  // GET /:teamId/members?tenantId=&search=
  fastify.get('/members/:teamId', {
    schema: {
      tags: ['Team'],
      summary: 'List team members',
      params: {
        type: 'object',
        required: ['teamId'],
        properties: { teamId: { type: 'integer' } }
      },
      querystring: {
        type: 'object',
        required: ['tenantId'],
        properties: {
          tenantId: { type: 'integer' },
          search: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' },
                  departmentId: { type: 'integer', nullable: true }
                }
              }
            }
          }
        }
      }
    }
  }, async (req, reply) => {
    const { teamId } = req.params;
    const { tenantId, search } = req.query;

    const params = [tenantId, teamId];
    let where = `e."TenantID" = $1 AND e."DepartmentID" = $2`;
    if (search) {
      params.push(`%${search}%`);
      where += ` AND e."Name" ILIKE $${params.length}`;
    }

    const { rows } = await fastify.pg.query(`
      SELECT e."EmployeeID" AS id, e."Name" AS name, e."DepartmentID" AS "departmentId"
      FROM organization."tblEmployee" e
      WHERE ${where}
      ORDER BY e."EmployeeID" ASC;
    `, params);

    return { items: rows };
  });

  // POST /:teamId/members  { tenantId, employeeId }
  fastify.post('/:teamId/members', {
    schema: {
      tags: ['Team'],
      summary: 'Add (or move) a member to this team',
      params: {
        type: 'object',
        required: ['teamId'],
        properties: { teamId: { type: 'integer' } }
      },
      body: {
        type: 'object',
        required: ['tenantId', 'employeeId'],
        properties: {
          tenantId: { type: 'integer' },
          employeeId: { type: 'integer' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            member: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                departmentId: { type: 'integer' }
              }
            }
          }
        }
      }
    }
  }, async (req, reply) => {
    const { teamId } = req.params;
    const { tenantId, employeeId } = req.body;

    const { rows } = await fastify.pg.query(`
      UPDATE organization."tblEmployee"
         SET "DepartmentID" = $3
       WHERE "TenantID" = $1 AND "EmployeeID" = $2
       RETURNING "EmployeeID" AS id, "Name" AS name, "DepartmentID" AS "departmentId";
    `, [tenantId, employeeId, teamId]);

    return reply.code(201).send({ member: rows[0] || null });
  });

  // DELETE /members/:employeeId?tenantId=
  // (Clears DepartmentID to remove from any team)
  fastify.delete('/members/:employeeId', {
    schema: {
      tags: ['Team'],
      summary: 'Remove a member from their team (clear DepartmentID)',
      params: {
        type: 'object',
        required: ['employeeId'],
        properties: { employeeId: { type: 'integer' } }
      },
      querystring: {
        type: 'object',
        required: ['tenantId'],
        properties: { tenantId: { type: 'integer' } }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            member: {
              type: 'object',
              nullable: true,
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                departmentId: { type: ['integer', 'null'] }
              }
            }
          }
        }
      }
    }
  }, async (req, reply) => {
    const { tenantId } = req.query;
    const { employeeId } = req.params;

    const { rows } = await fastify.pg.query(`
      UPDATE organization."tblEmployee"
         SET "DepartmentID" = NULL
       WHERE "TenantID" = $1 AND "EmployeeID" = $2
       RETURNING "EmployeeID" AS id, "Name" AS name, "DepartmentID" AS "departmentId";
    `, [tenantId, employeeId]);

    return { member: rows[0] || null };
  });
}
