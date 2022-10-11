import { crudLocalhost, urlBase } from "../../../../shared/service.utils";

const entityName = "membres/";

export const { findAll, findById, destroy, create, update } =
  crudLocalhost(entityName);

const path =
  (urlBase) =>
  (operation = "") =>
    urlBase + operation;

const crud = (urlBase) => (entityName) => {
  const entityUrl = path(urlBase)(entityName);
  return {
    findMembreByIdBureau: (idBureau) =>
      fetch(entityUrl + idBureau).then((res) => res.json()),
  };
};
export const { findMembreByIdBureau } = crud(urlBase)(entityName);
