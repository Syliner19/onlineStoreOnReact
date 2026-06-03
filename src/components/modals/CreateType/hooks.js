import { useFetch } from "../../../api/hooks/useFetch";
import {
  addTypeApi,
  deleteTypeApi,
  fetchTypesApi,
} from "../../../http/typesAPI";

export const useGetTypes = () => {
  const {
    response = [],
    error,
    isLoading,
    trigger,
  } = useFetch(fetchTypesApi, { autoTrigger: true });
  return {
    types: response || [],
    error,
    isLoading,
    getTypes: trigger,
  };
};

export const useAddType = () => {
  const {
    response = { type: {}, types: [] },
    error,
    isLoading,
    trigger,
  } = useFetch(addTypeApi);
  return {
    types: response?.types || [],
    error,
    isLoading,
    addType: trigger,
  };
};

export const useDeleteType = () => {
  const {
    response = { type: {}, types: [] },
    error,
    isLoading,
    trigger,
  } = useFetch(deleteTypeApi);
  return {
    types: response?.types || [],
    error,
    isLoading,
    deleteType: trigger,
  };
};
