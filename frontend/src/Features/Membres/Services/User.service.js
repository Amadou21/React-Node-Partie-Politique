import { crudLocalhost, urlBase } from "../../../shared/service.utils";
//import jwtDecode from 'jsonwebtoken';

const entityName = "users/";

export const { findAll, findById, destroy, create, update } = crudLocalhost(entityName);

export const find = async (data) => {
    const resp = await fetch(urlBase + entityName + 'login/' + data.email + '/' + data.password);
    const resptoken = await fetch(urlBase + entityName + 'login/' + data.email + '/' + data.password).then(res => res.json());
    console.log(resptoken);
    return (resp);
}
export const isAuth = async (token) => await fetch(urlBase + entityName + 'auth/' + token, { method: "GET", headers: { "authorization": "bearers " + token }, body: JSON.stringify(token), })

/*export function hasAuthenticated() {
    const token = window.localStorage.getItem('token');
    const result = token ? tokenIsValid(token) : false;

    if (false === result) {
        localStorage.removeItem('token');
    }

    return result;
}

function tokenIsValid(token) {
    const { exp: expiration } = jwtDecode(token);

    if (expiration * 1000 > new Date().getTime()) {
        return true;
    }
    return false;
}*/