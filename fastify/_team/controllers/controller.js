const S = require('fluent-json-schema');

module.exports = function JobController(fastify) {
  const Model = require('../models/Model')(fastify);

  // GET /api/jobs
  const listSchema = {
    querystring: S.object()
      .prop('tenantId', S.integer().required())
      .prop('search', S.string()),
    response: {
      200: S.object().prop('items', S.array().items(
        S.object()
          .prop('id', S.integer())
          .prop('name', S.string())
          .prop('legalEntities', S.array().items(
            S.object().prop('id', S.integer()).prop('label', S.string())
          ))
          .prop('levels', S.array().items(
            S.object().prop('id', S.integer()).prop('label', S.string()).prop('sort', S.integer())
          ))
      )),
    },
  };

  async function list(req, reply) {
    const { tenantId, search } = req.query;
    const items = await Model.listJobs({ tenantId, search });
    return reply.send({ items });
  }

  // POST /api/jobs
  const createSchema = {
    querystring: S.object()
      .prop('tenantId', S.integer().required()),
    body: S.object()
      .prop('name', S.string().minLength(1).required())
      .prop('legalEntityIds', S.array().items(S.integer()))
      .prop('levels', S.array().items(S.string())),
    response: {
      201: S.object().prop('job', S.object()
        .prop('id', S.integer())
        .prop('name', S.string())
        // add a legacy property to satisfy your UI's handleCreated fallback
        .prop('Name', S.string())
      ),
    },
  };

  async function create(req, reply) {
    const { tenantId } = req.query;
    const { name, legalEntityIds, levels } = req.body || {};
    const job = await Model.createJob({ tenantId, name, legalEntityIds, levels });
    // include "Name" for your UI fallback: job?.Name || job?.name
    return reply.code(201).send({ job: { ...job, Name: job.name } });
  }

  return { list, listSchema, create, createSchema };
};
// --- NEW: list employees with team flag (optionally exclude leaders) ---

// GET /api/jobs/employees-flag
const listEmployeesFlagSchema = {
  querystring: S.object()
    .prop('tenantId', S.integer().required())
    .prop('teamId', S.integer().required())
    .prop('search', S.string())
    // excludeLeaders defaults to true; set ?excludeLeaders=false to include leaders
    .prop('excludeLeaders', S.boolean()),
  response: {
    200: S.object().prop('items', S.array().items(
      S.object()
        .prop('id', S.integer())              // EmployeeID
        .prop('name', S.string())             // Name
        .prop('departmentId', S.integer().nullable())
        .prop('in_team', S.boolean())         // true if departmentId == teamId
        .prop('is_team_leader', S.boolean())  // true if leader of that team
    )),
  },
};

async function listEmployeesFlag(req, reply) {
  const { tenantId, teamId, search, excludeLeaders } = req.query;
  const items = excludeLeaders !== false
    ? await Model.listEmployeesWithTeamFlagExcludeLeaders({ tenantId, teamId, search })
    : await Model.listEmployeesWithTeamFlag({ tenantId, teamId, search });
  return reply.send({ items });
}

// --- export new handlers without touching existing ones ---
module.exports = function JobController(fastify) {
  const Model = require('../models/Model')(fastify);

  // keep your existing handlers exactly as-is:
  // listSchema, list, createSchema, create

  // re-declare them here unchanged:
  const listSchema = {
    querystring: S.object()
      .prop('tenantId', S.integer().required())
      .prop('search', S.string()),
    response: {
      200: S.object().prop('items', S.array().items(
        S.object()
          .prop('id', S.integer())
          .prop('name', S.string())
          .prop('legalEntities', S.array().items(
            S.object().prop('id', S.integer()).prop('label', S.string())
          ))
          .prop('levels', S.array().items(
            S.object().prop('id', S.integer()).prop('label', S.string()).prop('sort', S.integer())
          ))
      )),
    },
  };

  async function list(req, reply) {
    const { tenantId, search } = req.query;
    const items = await Model.listJobs({ tenantId, search });
    return reply.send({ items });
  }

  const createSchema = {
    querystring: S.object()
      .prop('tenantId', S.integer().required()),
    body: S.object()
      .prop('name', S.string().minLength(1).required())
      .prop('legalEntityIds', S.array().items(S.integer()))
      .prop('levels', S.array().items(S.string())),
    response: {
      201: S.object().prop('job', S.object()
        .prop('id', S.integer())
        .prop('name', S.string())
        .prop('Name', S.string())
      ),
    },
  };

  async function create(req, reply) {
    const { tenantId } = req.query;
    const { name, legalEntityIds, levels } = req.body || {};
    const job = await Model.createJob({ tenantId, name, legalEntityIds, levels });
    return reply.code(201).send({ job: { ...job, Name: job.name } });
  }

  // expose the new schema + handler in the controller export
  return {
    list, listSchema,
    create, createSchema,
    // NEW:
    listEmployeesFlag, listEmployeesFlagSchema,
  };
};
