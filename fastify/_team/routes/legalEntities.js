const S = require('fluent-json-schema');

module.exports = async function catalogLegalEntitiesRoutes(fastify) {
  fastify.get('/catalog/legal-entities', {
    schema: {
      querystring: S.object().prop('tenantId', S.integer().required()),
      response: {
        200: S.object().prop('items', S.array().items(
          S.object().prop('id', S.integer()).prop('label', S.string())
        )),
      },
    },
  }, async (req, reply) => {
    const { tenantId } = req.query;
    const sql = `
      SELECT "LegalEntityID" AS id, "Label" AS label
      FROM organization."tblLegalEntity"
      WHERE "TenantID" = $1 AND "IsActive" = TRUE
      ORDER BY "LegalEntityID" ASC;
    `;
    const { rows } = await fastify.pg.query(sql, [tenantId]);
    return reply.send({ items: rows });
  });
};
