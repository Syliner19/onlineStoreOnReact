import React, { useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import AddUserForm from "./AddUserForm";
import SearchUsersForm from "./SearchUsersForm";
import UsersList from "./UsersList";
import CreateUsersError from "./CreateUsersError";
import { CreateUsersContext } from "./CreateUsersContext";

const CreateUsers = ({ show, onHide }) => {
  const {
    debouncedSearchingUsersValue,
    addUser,
    deleteUser,
    searchUsers,
    setSearchingUsersValue,
    searchingUsersValue,
    users,
    roles,
    userName,
    userRole,
    setUserRole,
    setUserName,
    updateRole,
  } = useContext(CreateUsersContext);

  useEffect(() => {
    if (debouncedSearchingUsersValue) {
      searchUsers(debouncedSearchingUsersValue);
    } else {
      searchUsers("");
    }
  }, [debouncedSearchingUsersValue, searchUsers]);

  const handleUser = async () => {
    try {
      const response = await addUser(userName, userRole);
      console.log(
        `Отправка ссылки пользователю на почту`,
        response.registrationLink,
      );
      setUserName("");
      setUserRole("Выберите роль");
    } catch (e) {}
  };
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      await searchUsers(debouncedSearchingUsersValue);
    } catch (e) {}
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await updateRole(userId, newRole);
      await searchUsers(debouncedSearchingUsersValue);
    } catch (e) {}
  };

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Редактирование пользователей
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddUserForm onClick={handleUser} />
        <hr />
        <SearchUsersForm />
        {users.length === 0 && debouncedSearchingUsersValue ? (
          <CreateUsersError title="Пользователи не найдены!" />
        ) : (
          <UsersList onChange={handleChangeRole} onClick={handleDeleteUser} />
        )}
      </Modal.Body>
    </Modal>
  );
};
export default CreateUsers;
