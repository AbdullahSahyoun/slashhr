// _catalog/controllers/SelectEmployeeController.js
import { selectEmployeesByOrg } from '../models/SelectEmployee.model.js';
import { ListResponseSchema, ErrorSchema } from '../utils/schemas.js';

function resolveTenantId(request) {
  return (
    request.user?.TenantID ??
    request.user?.tenantId ??
    request.user?.tenant_id ??
    (request.headers['x-tenant-id'] ? Number(request.headers['x-tenant-id']) : undefined) ??
    (request.query?.tenantId ? Number(request.query.tenantId) : undefined)
  );
}

export default async function SelectEmployeeController(fastify) {
  const maybeAuth = fastify.authenticate ? { preHandler: fastify.authenticate } : {};

  fastify.get('/_catalog/employees/select', {
     schema: {
      tags: ['Catalog'],
      summary: 'Select employees by Org_Id (returns id, name, photo)',
      querystring: {
        type: 'object',
        required: ['orgId'],
        properties: {
          orgId: { type: 'integer' },
        }
      },
      response: {
        200: ListResponseSchema('EmployeeSelect', {
          id: { type: 'integer' },
          name: { type: 'string' },
          photo: { type: 'string', nullable: true }
        }),
        400: ErrorSchema,
        500: ErrorSchema
      }
    }
  }, async (request, reply) => {
    const { orgId } = request.query;
    const tenantId = resolveTenantId(request); // kept for consistency even if not used here
    const rows = await selectEmployeesByOrg(fastify.pg, orgId);
    return { items: rows };
  });
}
