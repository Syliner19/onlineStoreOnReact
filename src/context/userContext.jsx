import { createContext } from "react";
import { useUserRole } from "../hooks/useUserRole";
export const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const { role, isAuth, isAdmin, error, isLoading, refresh } = useUserRole();
  const values = {
    role,
    isAuth,
    isAdmin,
    error,
    isLoading,
    refresh,
  };
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
