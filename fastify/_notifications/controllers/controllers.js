// _notification/controllers/controllers.js  (ESM-only, tolerant to model export shape)

// IMPORTANT: make sure your folder name matches this path exactly.
// If your folder is `_notifications`, adjust the import path accordingly.
const MODEL_PATH = '../models/models.js';

let _factory; // cache once resolved

async function getFactory() {
  if (_factory) return _factory;
  const mod = await import(MODEL_PATH);
  // Accept any of these forms:
  //   export default function NotificationModel(...)
  //   export function NotificationModel(...)
  //   export const NotificationModelFactory = (...)
  //   module.exports = function(...)   (CJS, shows up as mod.default)
  _factory =
    mod.default ??
    mod.NotificationModel ??
    mod.NotificationModelFactory ??
    mod.createModel;

  if (typeof _factory !== 'function') {
    throw new Error(
      "models.js must export a model factory (default or named: NotificationModel / NotificationModelFactory / createModel)"
    );
  }
  return _factory;
}

// Helper: get a model instance for the given fastify instance
async function M(fastify) {
  const factory = await getFactory();
  return factory(fastify);
}

/* ================== Controllers ================== */

// GET /notifications/employee/:employeeId
export async function listByEmployee(fastify, req, reply) {
  try {
    const employeeId = Number.parseInt(req.params.employeeId, 10);
    if (Number.isNaN(employeeId)) {
      return reply.code(400).send({ message: 'employeeId must be a number' });
    }

    const { status, limit, offset } = req.query ?? {};
    const lim = Number.isNaN(Number.parseInt(limit, 10)) ? 50 : Number.parseInt(limit, 10);
    const off = Number.isNaN(Number.parseInt(offset, 10)) ? 0 : Number.parseInt(offset, 10);

    const rows = await (await M(fastify)).listByEmployeeId({
      employeeId,
      status: status || null,
      limit: lim,
      offset: off
    });

    return reply.send(rows);
  } catch (err) {
    req.log.error({ err }, 'listByEmployee failed');
    return reply.code(500).send({ message: 'Database error' });
  }
}

// GET /notifications/:id
export async function getById(fastify, req, reply) {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return reply.code(400).send({ message: 'id must be a number' });
    }

    const row = await (await M(fastify)).getById(id);
    if (!row) return reply.code(404).send({ message: 'Not found' });
    return reply.send(row);
  } catch (err) {
    req.log.error({ err }, 'getById failed');
    return reply.code(500).send({ message: 'Database error' });
  }
}

// POST /notifications/employee/:employeeId
export async function createForEmployee(fastify, req, reply) {
  try {
    const employeeId = Number.parseInt(req.params.employeeId, 10);
    if (Number.isNaN(employeeId)) {
      return reply.code(400).send({ message: 'employeeId must be a number' });
    }

    const {
      tenantId,
      title,
      message,
      relatedEntityType = null,
      relatedEntityID = null,
      status = 'Unread'
    } = req.body ?? {};

    if (!tenantId) return reply.code(400).send({ message: 'tenantId is required' });
    if (!title) return reply.code(400).send({ message: 'title is required' });
    if (!message) return reply.code(400).send({ message: 'message is required' });

    const relatedId =
      relatedEntityID === null || relatedEntityID === undefined
        ? null
        : Number.isNaN(Number.parseInt(relatedEntityID, 10))
        ? null
        : Number.parseInt(relatedEntityID, 10);

    const created = await (await M(fastify)).insertForEmployee({
      tenantId,
      employeeId,
      title,
      message,
      relatedEntityType,
      relatedEntityID: relatedId,
      status
    });

    return reply.code(201).send(created);
  } catch (err) {
    if (err && /No linked UserID for this EmployeeID/i.test(err.message)) {
      return reply.code(400).send({ message: 'Employee has no linked UserID' });
    }
    req.log.error({ err }, 'createForEmployee failed');
    return reply.code(500).send({ message: 'Database error' });
  }
}

// PATCH /notifications/:id/read
export async function markAsRead(fastify, req, reply) {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return reply.code(400).send({ message: 'id must be a number' });
    }

    const updated = await (await M(fastify)).markAsRead(id);
    if (!updated) return reply.code(404).send({ message: 'Not found' });
    return reply.send(updated);
  } catch (err) {
    req.log.error({ err }, 'markAsRead failed');
    return reply.code(500).send({ message: 'Database error' });
  }
}

// DELETE /notifications/:id
export async function deleteById(fastify, req, reply) {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return reply.code(400).send({ message: 'id must be a number' });
    }

    const ok = await (await M(fastify)).deleteById(id);
    if (!ok) return reply.code(404).send({ message: 'Not found' });
    return reply.code(204).send();
  } catch (err) {
    req.log.error({ err }, 'deleteById failed');
    return reply.code(500).send({ message: 'Database error' });
  }
}
