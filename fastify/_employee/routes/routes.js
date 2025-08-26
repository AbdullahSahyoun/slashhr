// _employee/routes/routes.js
import { getPersonal, listPersonal } from '../controllers/employeePersonalController.js';
import { getProfessional } from '../controllers/employeeProfessionalController.js';
import { listEmployeeDocuments } from '../controllers/employeeDocumentsController.js';
import { listEmployeeLeaveHistory } from '../controllers/employeeLeaveHistoryController.js';
import { listEmployeeLetterHistory } from '../controllers/employeeLetterHistoryController.js';
import { getEmployeeNameById } from '../controllers/employeeNameController.js';
import { listEmployeesByCompany } from '../controllers/getEmployeesByCompanyController.js';
import { getDepartments } from '../controllers/employeeDepartmentsController.js';

export default async function employeeRoutes(app) {
  // Personal info
  app.get('/personal',
    { schema: { tags: ['Employee'], summary: 'List personal info (all / paged)' } },
    listPersonal
  );
  app.get('/:id/personal',
    { schema: { tags: ['Employee'], summary: 'Get personal info by employee id' } },
    getPersonal
  );

  // Professional info
  app.get('/:id/professional',
    { schema: { tags: ['Employee'], summary: 'Get professional info by employee id' } },
    getProfessional
  );

  // Documents / Leave / Letters
  app.get('/:id/documents',
    { schema: { tags: ['Employee'], summary: 'List employee documents' } },
    listEmployeeDocuments
  );
  app.get('/:id/leave-history',
    { schema: { tags: ['Employee'], summary: 'List employee leave history' } },
    listEmployeeLeaveHistory
  );
  app.get('/:id/letter-history',
    { schema: { tags: ['Employee'], summary: 'List employee letter history' } },
    listEmployeeLetterHistory
  );

  // Name-only
  app.get('/:id/name',
    { schema: { tags: ['Employee'], summary: 'Get employee name by id' } },
    getEmployeeNameById
  );

  // Company-scoped
  app.get('/company/:orgId/employees',
    { schema: { tags: ['Employee'], summary: 'List employees by organization id' } },
    listEmployeesByCompany
  );
  app.get('/company/:orgId/departments',
    { schema: { tags: ['Employee'], summary: 'List departments by organization id' } },
    getDepartments
  );
}
