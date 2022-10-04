import { useQuery } from "react-query";
import { findAll, findById, destroy, create, update } from "./region.services";
import {
  useCreate as _useCreate,
  useDelete as _useDelete,
  useUpdate as _useUpdate,
} from "../../../../shared/store";

const entity = "region";

export const useRegion = () => {
  const { data, refetch, ...others } = useQuery([entity, "findAll"], findAll, {
    refetchInterval: 2_000,
  });
  let regions = data || [];
  return { regions, ...others };
};

export const useRegionById = (id) => {
  const { data, ...others } = useQuery([entity, "findById"], () =>
    findById(id)
  );
  let region = data || [];
  return { region, ...others };
};

export const useCreate = () => _useCreate(create);
export const useDelete = () => _useDelete(destroy);
export const useUpdate = () => _useUpdate(update);
