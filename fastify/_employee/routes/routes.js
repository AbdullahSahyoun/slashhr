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
  // Personal info routes
  app.get('/personal', listPersonal);
  app.get('/:id/personal', getPersonal);

  // Professional info route
  app.get('/:id/professional', getProfessional);

  // Other info routes
  app.get('/:id/documents', listEmployeeDocuments);
  app.get('/:id/leave-history', listEmployeeLeaveHistory);
  app.get('/:id/letter-history', listEmployeeLetterHistory);

  // Name only route
  app.get('/:id/name', getEmployeeNameById);

  // ✅ New route: Get all employees by company/orgId
// in _employee/routes/routes.js
app.get('/company/:orgId/employees', listEmployeesByCompany);
app.get('/company/:orgId/departments', getDepartments);

}
