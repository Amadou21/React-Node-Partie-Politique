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
  let region = data || [];
  return { region, ...others };
};

export const useRegionById = (id) => {
  const { data, ...others } = useQuery([entity, "findById"], () =>
    findById(id)
  );
  let region = data || [];
  return { region, ...others };
};

/*export const useUserByLogin = (login, motDePass) => {
    const { data, ...others } = useQuery([entity, "findByLogin"], () => find(login, motDePass));
    let user = data;
    return { user, ...others };
}*/

export const useCreate = () => _useCreate(create);
export const useDelete = () => _useDelete(destroy);
export const useUpdate = () => _useUpdate(update);

// export const useRegionrByLogin = () => {
//   const { mutateAsync, ...others } = useMutation(find, {
//     onMutate: (variables) => {
//       console.log("onMutate", { variables });
//     },
//     onError: (error, variables, context) => {
//       console.log("onError", { error, variables, context });
//     },
//     onSuccess: (data, variables, context) => {
//       console.log("onSuccess ", { data, variables, context });
//       window.localStorage.setItem("token", data.token);
//     },
//   });
//   return { find: mutateAsync, ...others };
// };
