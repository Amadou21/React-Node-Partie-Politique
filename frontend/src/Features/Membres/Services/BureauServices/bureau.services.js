import { crudLocalhost } from "../../../../shared/service.utils";

const entityName = "bureaux/";

export const { findAll, findById, destroy, create, update } =
  crudLocalhost(entityName);
