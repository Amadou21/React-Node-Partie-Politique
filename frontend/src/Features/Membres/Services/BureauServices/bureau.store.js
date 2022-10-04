import { useQuery } from "react-query";
import { findAll, findById, destroy, create, update } from "./bureau.services";
import {
  useCreate as _useCreate,
  useDelete as _useDelete,
  useUpdate as _useUpdate,
} from "../../../../shared/store";

const entity = "bureaux";

export const useBureaux = () => {
  const { data, refetch, ...others } = useQuery([entity, "findAll"], findAll, {
    refetchInterval: 2_000,
  });
  let bureaux = data || [];
  return { bureaux, ...others };
};

export const useBureauById = (id) => {
  const { data, ...others } = useQuery([entity, "findById"], () =>
    findById(id)
  );
  let bureau = data || [];
  return { bureau, ...others };
};

export const useCreate = () => _useCreate(create);
export const useDelete = () => _useDelete(destroy);
export const useUpdate = () => _useUpdate(update);
