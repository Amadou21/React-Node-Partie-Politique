import { useQuery } from "react-query";
import { findAll, findById, destroy, create, update, find } from "./User.service";
import { useCreate as _useCreate, useDelete as _useDelete, useUpdate as _useUpdate } from "../../../shared/store";

const entity = "users";

export const useUsers = () => {
    const { data, refetch, ...others } = useQuery([entity, "findAll"], findAll,
        { refetchInterval: 2_000 });
    let users = data || [];
    return { users, ...others };
}

export const useUserById = (id) => {
    const { data, ...others } = useQuery([entity, "findById"], () => findById(id));
    let user = data || [];
    return { user, ...others };
}

export const useUserByLogin = (login, motDePass) => {
    const { data, ...others } = useQuery([entity, "findByLogin"], () => find(login, motDePass));
    let user = data;
    return { user, ...others };
}

export const useCreate = () => _useCreate(create)

export const useDelete = () => _useDelete(destroy)

export const useUpdate = () => _useUpdate(update)
