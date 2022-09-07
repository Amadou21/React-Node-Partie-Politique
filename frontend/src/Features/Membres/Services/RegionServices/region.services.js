import { crudLocalhost } from "../../../../shared/service.utils";

const entityName = "regions/";

export const { findAll, findById, destroy, create, update } =
  crudLocalhost(entityName);
