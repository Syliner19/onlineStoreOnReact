import { useFetch } from "../../../api/hooks/useFetch";
import {
  addBrandApi,
  deleteBrandApi,
  fetchBrandApi,
} from "../../../http/brandsAPI";

export const useAddBrand = () => {
  const { error, isLoading, trigger } = useFetch(addBrandApi);
  return { error, isLoading, addBrand: trigger };
};

export const useDeleteBrand = () => {
  const { error, isLoading, trigger } = useFetch(deleteBrandApi);
  return { error, isLoading, deleteBrand: trigger };
};

export const useGetBrands = () => {
  const { response, error, isLoading, trigger } = useFetch(fetchBrandApi, {
    autoTrigger: true,
  });
  return { brands: response || [], error, isLoading, getBrands: trigger };
};
