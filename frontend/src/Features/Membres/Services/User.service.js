import { crudLocalhost } from "../../../shared/service.utils";
//import jwtDecode from 'jsonwebtoken';

const entityName = "users/";

export const { findAll, findById, destroy, create, update, find } = crudLocalhost(entityName);

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