import { crudLocalhost } from "../../../../shared/service.utils";

const entityName = "localites/";

export const { findAll, findById, destroy, create, update } =
  crudLocalhost(entityName);
