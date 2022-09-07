import { crudLocalhost } from "../../../shared/service.utils";

const entityName = "bureau/";

export const { findAll, findById, destroy, create, update } =
  crudLocalhost(entityName);
