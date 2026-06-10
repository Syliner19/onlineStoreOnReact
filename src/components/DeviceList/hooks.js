import { useNavigate } from "react-router-dom";
import { useFetch } from "../../api/hooks/useFetch";
import { getFilteredDevices } from "../../http/deviceAPI";
import { useCallback } from "react";
import { DEVICE_ROUTE } from "../../utils/const";

export const useGetDevices = (filter) => {
  const getDevices = useCallback(
    () => getFilteredDevices(filter),
    [getFilteredDevices, filter],
  );
  const { response, error, isLoading, trigger } = useFetch(getDevices, {
    autoTrigger: true,
    initialData: [],
  });
  return { devices: response, error, isLoading, deleteDevice: trigger };
};

export const useNavidateDevice = () => {
  const navigate = useNavigate();

  return useCallback(
    (id) => {
      navigate(DEVICE_ROUTE + "/" + id);
    },
    [navigate],
  );
};
