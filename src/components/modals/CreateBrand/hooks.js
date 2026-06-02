import { useFetch } from "../../../api/hooks/useFetch";
import { addBrandApi, deleteBrandApi } from "../../../http/brandsAPI";

export const useAddBrand = () => {
  const { response, error, isLoading, trigger } = useFetch(addBrandApi);
  return { error, isLoading, addBrand: trigger };
};

export const useDeleteBrand = () => {
  const { response, error, isLoading, trigger } = useFetch(deleteBrandApi);
  return { error, isLoading, deleteBrand: trigger };
};
