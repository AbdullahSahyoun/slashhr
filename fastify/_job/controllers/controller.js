import { JobTitleModel } from '../models/models.js';

export const JobTitleController = {
  /* ======================= LISTS ======================= */
  listByTenant: async (req, reply) => {
    try {
      const { tenantId } = req.params;
      const data = await JobTitleModel.listByTenant(req.server.pg, Number(tenantId));
      return reply.send(data);
    } catch (err) {
      req.log.error(err);
      return reply.code(500).send({ message: 'Database error' });
    }
  },

  listWithCounts: async (req, reply) => {
    try {
      const { tenantId } = req.params;
      const data = await JobTitleModel.withEmployeeCounts(req.server.pg, Number(tenantId));
      return reply.send(data);
    } catch (err) {
      req.log.error(err);
      return reply.code(500).send({ message: 'Database error' });
    }
  },

  /* ============== SINGLE (TITLE) ============== */
  getById: async (req, reply) => {
    try {
      const { id } = req.params;
      const row = await JobTitleModel.getById(req.server.pg, Number(id));
      if (!row) return reply.code(404).send({ message: 'Not found' });
      return reply.send(row);
    } catch (err) {
      req.log.error(err);
      return reply.code(500).send({ message: 'Database error' });
    }
  },

  // Backward-compatibility alias: previously returned title + description,
  // now getById already includes description (same response shape).
  getDetails: async (req, reply) => {
    try {
      const { id } = req.params;
      const row = await JobTitleModel.getById(req.server.pg, Number(id));
      if (!row) return reply.code(404).send({ message: 'Not found' });
      return reply.send(row);
    } catch (err) {
      req.log.error(err);
      return reply.code(500).send({ message: 'Database error' });
    }
  },

  /* ======================= CREATE ======================= */
  // accepts: { TenantID, title_name, description?, is_active? }
  create: async (req, reply) => {
    try {
      const created = await JobTitleModel.create(req.server.pg, req.body);
      return reply.code(201).send(created);
    } catch (err) {
      if (err.code === '23505') {
        return reply.code(409).send({ message: 'Job title already exists for this tenant' });
      }
      req.log.error(err);
      return reply.code(500).send({ message: 'Database error' });
    }
  },

  /* ======================= UPDATE ======================= */
  // accepts: { title_name?, description?, is_active? }
  update: async (req, reply) => {
    try {
      const { id } = req.params;
      const updated = await JobTitleModel.update(req.server.pg, Number(id), req.body);
      if (!updated) return reply.code(404).send({ message: 'Not found' });
      return reply.send(updated);
    } catch (err) {
      if (err.code === '23505') {
        return reply.code(409).send({ message: 'Job title already exists for this tenant' });
      }
      req.log.error(err);
      return reply.code(500).send({ message: 'Database error' });
    }
  },

  /* ======================= DELETE ======================= */
  remove: async (req, reply) => {
    try {
      const { id } = req.params;
      const removed = await JobTitleModel.remove(req.server.pg, Number(id));
      if (!removed) return reply.code(404).send({ message: 'Not found' });
      return reply.send({ success: true, deleted: removed });
    } catch (err) {
      req.log.error(err);
      return reply.code(500).send({ message: 'Database error' });
    }
  },
};
