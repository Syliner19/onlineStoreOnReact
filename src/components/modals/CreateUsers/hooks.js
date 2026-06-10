import { useFetch } from "../../../api/hooks/useFetch";
import {
  addUserApi,
  fetchDeleteUser,
  fetchRoles,
  fetchSearchingUsers,
  updateUserRoleApi,
} from "../../../http/userAPI";

export const useLoadRoles = () => {
  const {
    response = [],
    error,
    isLoading,
    trigger,
  } = useFetch(fetchRoles, { autoTrigger: true });
  return {
    roles: response || [],
    error,
    isLoading,
    loading: trigger,
  };
};

export const useAddUser = () => {
  const {
    response = { user: {}, message: "", success: false, registrationLink: "" },
    error,
    isLoading,
    trigger,
  } = useFetch(addUserApi);
  return {
    user: response?.user || { id: "", email: "", role: "" },
    addUserError: error,
    isLoading,
    addUser: trigger,
  };
};

export const useSearchUsers = () => {
  const {
    response = [],
    error,
    isLoading,
    trigger,
  } = useFetch(fetchSearchingUsers);
  return {
    users: response || [],
    searchUsersError: error,
    isLoading,
    searchUsers: trigger,
  };
};

export const useDeleteUser = () => {
  const {
    response = {},
    error,
    isLoading,
    trigger,
  } = useFetch(fetchDeleteUser);
  return {
    user: response || {},
    deleteUserError: error,
    isLoading,
    deleteUser: trigger,
  };
};

export const useChangeUserRole = () => {
  const {
    response = {},
    error,
    isLoading,
    trigger,
  } = useFetch(updateUserRoleApi);
  return {
    user: response || {},
    updateRoleError: error,
    isLoading,
    updateRole: trigger,
  };
};
