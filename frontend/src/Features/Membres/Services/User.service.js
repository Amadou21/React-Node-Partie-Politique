import { crudLocalhost, urlBase } from "../../../shared/service.utils";
//import jwt from 'jsonwebtoken';

const entityName = "users/";

export const { findAll, findById, destroy, create, update } =
  crudLocalhost(entityName);

export const create2 = async (data) => {
  const resp = await create(data).then((res) => res.json());
  console.log("token", resp);
  const { token } = resp;
  addToken("token", token);
};

export const find = async ({ ...data }) => {
  const response = await fetch(urlBase + entityName + "login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const { token, idUser } = await fetch(urlBase + entityName + "login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
  console.log(token);
  if (response.ok) {
    addToken("token", token);
    addToken("id", idUser);
  }
  return response;
};
export const isAuth = async ({ ...token }) => {
  const resp = await fetch(urlBase + entityName + "auth/" + token, {
    method: "GET",
    headers: { authorization: "bearers " + token },
    body: JSON.stringify(token),
  });
  return resp;
};

function addToken(nom, valeur) {
  localStorage.removeItem(nom);
  localStorage.setItem(nom, valeur);
}

export function hasAuthenticated() {
  const token = window.localStorage.getItem("token");
  const result = isAuth(token);
  if (false === result.ok) {
    localStorage.removeItem("token");
  }
  return result;
}

/*function tokenIsValid(token) {
    const { exp: expiration } = jwt.decode(token);

    if (expiration * 1000 > new Date().getTime()) {
        return true;
    }
    return false;
}*/
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
