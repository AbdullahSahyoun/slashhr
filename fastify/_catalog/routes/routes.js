// _catalog/routes/rutes.js
import SelectEstablishmentController from '../controllers/SelectEstablishmentController.js';
import ContractTemplateController from '../controllers/ContractTemplateController.js';
import ReasonForContractController from '../controllers/ReasonForContractController.js';
import SocioProfessionalCategoryController from '../controllers/SocioProfessionalCategoryController.js';
import JobTitleController from '../controllers/JobTitleController.js';
import QualificationController from '../controllers/QualificationController.js';
import DepartmentController from '../controllers/DepartmentController.js';
import ManagersController from '../controllers/ManagersController.js';
import PrimaryRolesController from '../controllers/PrimaryRolesController.js';
import SecondaryRolesController from '../controllers/SecondaryRolesController.js';
import LegalEntitiesController from '../controllers/LegalEntitiesController.js';

// (If you’ll keep FormLookupsController too, import it here as well)

export default async function catalogRoutes(fastify) {
  await fastify.register(SelectEstablishmentController);
  await fastify.register(ContractTemplateController);
  await fastify.register(ReasonForContractController);
  await fastify.register(SocioProfessionalCategoryController);
  await fastify.register(JobTitleController);
  await fastify.register(QualificationController);
  await fastify.register(DepartmentController);
  await fastify.register(ManagersController);
  await fastify.register(PrimaryRolesController);
  await fastify.register(SecondaryRolesController);
  await fastify.register(LegalEntitiesController);

  // await fastify.register(FormLookupsController); // optional
}
