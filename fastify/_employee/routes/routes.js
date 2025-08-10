// _employee/routes/routes.js
import { getPersonal, listPersonal } from '../controllers/employeePersonalController.js';
import { getProfessional } from '../controllers/employeeProfessionalController.js';
import { listEmployeeDocuments } from '../controllers/employeeDocumentsController.js';
import { listEmployeeLeaveHistory } from '../controllers/employeeLeaveHistoryController.js';
import { listEmployeeLetterHistory } from '../controllers/employeeLetterHistoryController.js';
import { getEmployeeNameById } from '../controllers/employeeNameController.js';


export default async function employeeRoutes(app) {
  // Personal info routes
  app.get('/personal', listPersonal);
  app.get('/:id/personal', getPersonal);
  // Professional info route
  app.get('/:id/professional', getProfessional);
  app.get('/:id/documents', listEmployeeDocuments);
  app.get('/:id/leave-history', listEmployeeLeaveHistory);
  app.get('/:id/letter-history', listEmployeeLetterHistory);
  app.get('/:id/name', getEmployeeNameById);


}
// _employee/routes/routes.js
// _employee/routes/routes.js
// ...
