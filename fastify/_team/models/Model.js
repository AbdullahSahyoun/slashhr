// Data access for organization."tblJob" (+ levels + LE mapping)
const TABLE_JOB = 'organization."tblJob"';
const TABLE_LEVEL = 'organization."tblJobLevel"';
const TABLE_JOB_LE = 'organization."tblJobLegalEntity"';

module.exports = function JobModel(fastify) {
  const pg = fastify.pg;

  async function listJobs({ tenantId, search }) {
    const params = [tenantId];
    let where = `j."TenantID" = $1`;
    if (search) {
      params.push(`%${search}%`);
      where += ` AND j."Name" ILIKE $${params.length}`;
    }

    const sql = `
      SELECT j."JobID" AS id,
             j."Name"  AS name,
             COALESCE(
               json_agg(DISTINCT jsonb_build_object('id', le."LegalEntityID",'label', le."Label"))
               FILTER (WHERE le."LegalEntityID" IS NOT NULL), '[]'::json
             ) AS legalEntities,
             COALESCE(
               json_agg(DISTINCT jsonb_build_object('id', lvl."JobLevelID",'label', lvl."Label",'sort', lvl."SortOrder"))
               FILTER (WHERE lvl."JobLevelID" IS NOT NULL), '[]'::json
             ) AS levels
      FROM ${TABLE_JOB} j
      LEFT JOIN ${TABLE_JOB_LE} jle ON jle."JobID" = j."JobID"
      LEFT JOIN organization."tblLegalEntity" le ON le."LegalEntityID" = jle."LegalEntityID"
      LEFT JOIN ${TABLE_LEVEL} lvl ON lvl."JobID" = j."JobID"
      WHERE ${where}
      GROUP BY j."JobID"
      ORDER BY j."JobID" DESC;
    `;
    const { rows } = await pg.query(sql, params);
    return rows;
  }

  async function createJob({ tenantId, name, legalEntityIds = [], levels = [] }) {
    return await pg.transact(async (client) => {
      // Insert job
      const insJob = `
        INSERT INTO ${TABLE_JOB} ("TenantID","Name")
        VALUES ($1, $2)
        RETURNING "JobID" AS id, "Name" AS name;
      `;
      const { rows: jobRows } = await client.query(insJob, [tenantId, name.trim()]);
      const job = jobRows[0];

      // Map legal entities (distinct ints)
      const leIds = [...new Set((legalEntityIds || []).map(Number).filter(Boolean))];
      if (leIds.length) {
        const values = leIds.map((_, i) => `($1, $${i + 2})`).join(',');
        await client.query(
          `INSERT INTO ${TABLE_JOB_LE} ("JobID","LegalEntityID") VALUES ${values} ON CONFLICT DO NOTHING;`,
          [job.id, ...leIds]
        );
      }

      // Insert levels
      const levelLabels = (levels || [])
        .map((s) => String(s || '').trim())
        .filter(Boolean);
      if (levelLabels.length) {
        const values = levelLabels
          .map((_, i) => `($1, $2, $${i + 3}, ${i})`)
          .join(',');
        await client.query(
          `INSERT INTO ${TABLE_LEVEL} ("TenantID","JobID","Label","SortOrder")
           VALUES ${values};`,
          [tenantId, job.id, ...levelLabels]
        );
      }

      return job;
    });
  }

  return {
    listJobs,
    createJob,
  };
};
