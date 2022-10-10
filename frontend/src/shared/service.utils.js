export const urlBase = "http://localhost:3001/";

const path =
  (urlBase) =>
  (operation = "") =>
    urlBase + operation;

const crud = (urlBase) => (entityName) => {
  const entityUrl = path(urlBase)(entityName);
  return {
    findAll: () => fetch(entityUrl).then((res) => res.json()),
    findById: (id) => fetch(entityUrl + id).then((res) => res.json()),
    findByIdPays: (idPays) =>
      fetch(entityUrl + idPays).then((res) => res.json()),
    findByIdLoaclite: (idLocalite) =>
      fetch(entityUrl + idLocalite).then((res) => res.json()),
    destroy: async (id) => {
      await fetch(entityUrl + id, { method: "DELETE" });
      return true;
    },
    create: async ({ ...data }) => {
      return await fetch(entityUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    update: async ({ id, ...data }) => {
      await fetch(entityUrl + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
  };
};
export const crudLocalhost = crud(urlBase);
