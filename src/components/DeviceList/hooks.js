import { useNavigate } from "react-router-dom";
import { useFetch } from "../../api/hooks/useFetch";
import { getDevices } from "../../http/deviceAPI";
import { DEVICE_ROUTE } from "../../utils/const";
import { useCallback } from "react";

export const useGetDevices = () => {
    const {
        response,
        error,
        isLoading,
        trigger,
    } = useFetch(getDevices, { autoTrigger: true, initialData: [] });

    return {
        devices: response,
        error,
        isLoading,
        deleteDevice: trigger,
    };
}

export const useNavigateDevice = () => {
    const navigate = useNavigate();
    
    return useCallback(
        (id) => navigate(DEVICE_ROUTE + "/" + id),
        [navigate],
    );
}