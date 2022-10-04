import { crudLocalhost, urlBase } from "../../../../shared/service.utils";

const entityName = "users/";

export const { findAll, findById, destroy, create } = crudLocalhost(entityName);

export const create2 = async (data) => {
  const resp = await create(data).then((res) => res.json());
  const { token, idUser } = resp;
  console.log("token", resp);
  addToken("token", token);
  addToken("idUser", idUser);
};

export const find = async ({ ...data }) => {
  const response = await fetch(urlBase + entityName + "login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const { token, idUser } = await response.json();

    addToken("token", token);
    addToken("idUser", idUser);
  }

  return response;
};
export const isAuth = async (token) => {
  const resp = await fetch(urlBase + entityName + "auth/" + token);
  console.log("Token de isAuth", token);
  console.log("isAuth resp: ", resp);
  return resp;
};

function addToken(nom, valeur) {
  //localStorage.removeItem(nom);
  localStorage.setItem(nom, valeur);
}

export const hasAuthenticated = async () => {
  const token = window.localStorage.getItem("token");
  const result = await isAuth(token);
  console.log("hasauthenticated", result);
  if (result.length > 0) {
    console.log("result.length", result.length);
    localStorage.removeItem("token");
  }
  return result;
};

const path =
  (urlBase) =>
  (operation = "") =>
    urlBase + operation;

const crud = (urlBase) => (entityName) => {
  const entityUrl = path(urlBase)(entityName);
  return {
    findLogin: async (email) => fetch(entityUrl + "login/" + email),
    // update: async ({ idUser, ...data }) => {
    //   await fetch(entityUrl + idUser, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });
    // },
    update: async ({ idUser, ...data }) => {
      const formData = new FormData();
      formData.append("photoUser", data.photoUser);
      formData.append("nom", data.nom);
      formData.append("prenom", data.prenom);
      formData.append("motDePasse", data.motDePasse);
      formData.append("login", data.login);
      await fetch(entityUrl + idUser, {
        method: "POST",
        body: formData,
      });
    },
    updatePhoto: async ({ idUser, photoUser, ...data }) => {
      const formData = new FormData();
      formData.append("photoUser", photoUser);
      // formData.append("user", ...data);
      formData.append("nom", data.nom);
      formData.append("prenom", data.prenom);
      formData.append("motDePasse", data.motDePasse);
      formData.append("login", data.login);
      // data.photoUser = data.photoUser.File;
      await fetch(entityUrl + idUser, {
        method: "POST",
        // body: JSON.stringify(data),
        body: formData,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      });
    },
  };
};

export const { findLogin, update, updatePhoto } = crud(urlBase)(entityName);
