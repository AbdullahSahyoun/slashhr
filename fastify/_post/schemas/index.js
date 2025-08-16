// _post/schemas/index.js

export const PostItemSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },        // change to 'string' if UUID
    slug: { type: 'string' },
    title: { type: 'string' },
    excerpt: { type: 'string', nullable: true },
    coverUrl: { type: 'string', nullable: true },
    status: { type: 'string' },     // draft|published|archived
    authorId: { type: 'integer' },
    publishedAt: { type: 'string', nullable: true },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  }
};

export const MetaSchema = {
  type: 'object',
  properties: {
    page: { type: 'integer' },
    limit: { type: 'integer' },
    total: { type: 'integer' },
    pages: { type: 'integer' },
  }
};

export const ListResponseSchema = {
  type: 'object',
  properties: {
    items: { type: 'array', items: PostItemSchema },
    meta: MetaSchema
  }
};

export const ErrorSchema = { type: 'object', properties: { error: { type: 'string' } } };

export const PostCreateBody = {
  type: 'object',
  required: ['slug', 'title', 'authorId'],
  properties: {
    slug: { type: 'string' },
    title: { type: 'string' },
    excerpt: { type: 'string', nullable: true },
    content: { type: 'string', nullable: true },
    coverUrl: { type: 'string', nullable: true },
    status: { type: 'string', enum: ['draft', 'published', 'archived'], default: 'draft' },
    authorId: { type: 'integer' },
    publishedAt: { type: 'string', nullable: true }
  }
};
