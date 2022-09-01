import { crudLocalhost } from "../../../shared/service.utils";

const entityName = "users/";

export const { findAll, findById, destroy, create, update, find } = crudLocalhost(entityName);
