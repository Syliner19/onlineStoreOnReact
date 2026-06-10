import { useFetch } from "../api/hooks/useFetch";
import { user } from "../http/userAPI";

export const useUserRole = () => {
  const {
    response = {},
    isLoading,
    trigger,
  } = useFetch(user, {
    autoTrigger: true,
    initialData: { user: { name: "", role: "", id: "" } },
  });
  return {
    role: response.user?.role || { role: null },
    isAuth: response?.success === true,
    isAdmin: response.user.role === "ADMIN",
    error: null,
    isLoading,
    refresh: trigger,
  };
};
