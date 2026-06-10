import { createContext, useState } from "react";
import {
  useAddUser,
  useChangeUserRole,
  useDeleteUser,
  useLoadRoles,
  useSearchUsers,
} from "./hooks";
import { useDebounce } from "use-debounce";

export const CreateUsersContext = createContext(null);
export const CreateUsersProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("Выберите роль");
  const [searchingUsersValue, setSearchingUsersValue] = useState("");
  const [debouncedSearchingUsersValue] = useDebounce(searchingUsersValue, 400);
  const { roles } = useLoadRoles();
  const { addUserError, addUser } = useAddUser();
  const { searchUsers, users } = useSearchUsers();
  const { deleteUser } = useDeleteUser();
  const { updateRole } = useChangeUserRole();

  const values = {
    userName,
    setUserName,
    userRole,
    setUserRole,
    searchingUsersValue,
    setSearchingUsersValue,
    debouncedSearchingUsersValue,
    roles,
    addUserError,
    addUser,
    searchUsers,
    users,
    deleteUser,
    updateRole,
  };
  return (
    <CreateUsersContext.Provider value={values}>
      {children}
    </CreateUsersContext.Provider>
  );
};
