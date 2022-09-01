export const urlBase = 'http://localhost:3001/';

const path = urlBase => (operation = "") => urlBase + operation;

const crud = urlBase => (entityName) => {
  const entityUrl = path(urlBase)(entityName);
  return {
    findAll: () => fetch(entityUrl).then(res => res.json()),
    findById: (id) => fetch(entityUrl + id).then(res => res.json()),
    destroy : async (id) => { await fetch(entityUrl + id, {method: "DELETE" });
      return true;
    },
    create : async ({ ...data }) => { await fetch(entityUrl,
        { method: "POST", headers: { "Content-Type": "application/json",},body: JSON.stringify(data),}
      );},
    update : async ({ id, ...data }) => {await fetch(entityUrl + id,
        { method: "PUT", headers: {"Content-Type": "application/json",}, body: JSON.stringify(data),}
      );},  
    find: async (email, password) => fetch(entityUrl + 'login/' +email+ '/'+password).then(res => res.json()),  
}
}
export const crudLocalhost = crud(urlBase);
