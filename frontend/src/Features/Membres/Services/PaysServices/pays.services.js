import { crudLocalhost } from "../../../../shared/service.utils";

const entityName = "pays/";

export const { findAll, findById, destroy, create, update } =
  crudLocalhost(entityName);
