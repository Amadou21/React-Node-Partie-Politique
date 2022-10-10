import { crudLocalhost, urlBase } from "../../../../shared/service.utils";

const entityName = "bureaux/";

export const { findAll, findById, destroy, create, update } =
  crudLocalhost(entityName);

const path =
  (urlBase) =>
  (operation = "") =>
    urlBase + operation;

const crud = (urlBase) => (entityName) => {
  const entityUrl = path(urlBase)(entityName);
  return {
    findByIdPays: (idPays) =>
      fetch(entityUrl + idPays).then((res) => res.json()),
    findByIdLocalite: (idLocalite) =>
      fetch(entityUrl + idLocalite).then((res) => res.json()),
  };
};

export const { findByIdLocalite, findByIdPays } = crud(urlBase)(entityName);
