import { urlBase, crudLocalhost } from "../../../shared/service.utils";

const entityName = "users/";

export const { findAll, findById, destroy, create, update, find } =
  crudLocalhost(entityName);

//--------------------------------------------------------------
const path =
  (urlBase) =>
  (operation = "") =>
    urlBase + operation;

const crud = (urlBase) => (entityName) => {
  const entityUrl = path(urlBase)(entityName);
  return {
    findLogin: async (email) => fetch(entityUrl + "login/" + email),
  };
};

export const { findLogin } = crud(urlBase)(entityName);
