// _catalog/utils/schemas.js

// If your IDs are integers, keep "integer". If UUIDs, change to "string".
const IdSchema = { type: 'integer' };

export const ListItemSchema = {
  type: 'object',
  required: ['id', 'label'],
  properties: {
    id: IdSchema,
    label: { type: 'string' },
  },
};

export const ListResponseSchema = {
  type: 'object',
  required: ['items'],
  properties: {
    items: {
      type: 'array',
      items: ListItemSchema,
    },
  },
};

export const ErrorSchema = {
  type: 'object',
  properties: {
    error: { type: 'string' },
  },
};
