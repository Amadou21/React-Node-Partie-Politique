import { crudLocalhost } from "../../../../shared/service.utils";

const entityName = "type/";

export const { findAll, findById, destroy, create, update } =
  crudLocalhost(entityName);
