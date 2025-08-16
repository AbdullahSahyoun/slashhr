// _post/models/Post.model.js

export async function listPosts(fastify, { page = 1, limit = 20, search = '', status = '' }) {
  const client = await fastify.pg.connect();
  try {
    const p = Math.max(1, Number(page));
    const l = Math.max(1, Math.min(Number(limit), 100));
    const offset = (p - 1) * l;

    const vals = [];
    const where = [];

    if (search) {
      vals.push(`%${search}%`);
      // use the same index for all three by repeating parameter index
      where.push(`(title ILIKE $${vals.length} OR excerpt ILIKE $${vals.length} OR content ILIKE $${vals.length})`);
    }
    if (status) {
      vals.push(status);
      where.push(`status = $${vals.length}`);
    }

    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const dataSql = `
      SELECT id, slug, title, excerpt, cover_url AS "coverUrl", status,
             author_id AS "authorId", published_at AS "publishedAt",
             created_at AS "createdAt", updated_at AS "updatedAt"
      FROM posts
      ${whereSql}
      ORDER BY published_at DESC NULLS LAST, created_at DESC
      LIMIT ${l} OFFSET ${offset}
    `;

    const countSql = `
      SELECT COUNT(*)::int AS total
      FROM posts
      ${whereSql}
    `;

    const [dataRes, countRes] = await Promise.all([
      client.query(dataSql, vals),
      client.query(countSql, vals),
    ]);

    return {
      items: dataRes.rows,
      meta: {
        page: p,
        limit: l,
        total: countRes.rows[0].total,
        pages: Math.ceil(countRes.rows[0].total / l),
      },
    };
  } finally {
    client.release();
  }
}

export async function createPost(fastify, data) {
  const client = await fastify.pg.connect();
  try {
    const q = `
      INSERT INTO posts (slug, title, excerpt, content, cover_url, status, author_id, published_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id, slug, title, excerpt, cover_url AS "coverUrl", status,
                author_id AS "authorId", published_at AS "publishedAt",
                created_at AS "createdAt", updated_at AS "updatedAt"
    `;
    const vals = [
      data.slug,
      data.title,
      data.excerpt || null,
      data.content || null,
      data.coverUrl || null,
      data.status || 'draft',
      data.authorId,
      data.publishedAt || null,
    ];
    const { rows } = await client.query(q, vals);
    return rows[0];
  } finally {
    client.release();
  }
}
export async function deletePost(fastify, id) {
  const client = await fastify.pg.connect();
  try {
    const { rows } = await client.query(
      `DELETE FROM posts WHERE id = $1 RETURNING id`,
      [id]
    );
    return rows[0]; // will be undefined if no match
  } finally {
    client.release();
  }
}
