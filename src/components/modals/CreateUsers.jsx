import React, { useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Dropdown,
  Form,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { addTypeApi, deleteTypeApi, fetchTypesApi } from "../../http/typesAPI";
import { useDispatch, useSelector } from "react-redux";
import { addType, setSelectType, setTypes } from "../../store/actions";
import { selectTypes, selectUser } from "../../store/selectors";
import {
  addUserApi,
  fetchDeleteUser,
  fetchRoles,
  fetchSearchingUsers,
  updateUserRoleApi,
} from "../../http/userAPI";
import { useDebounce } from "use-debounce";
import { useCallback } from "react";

const CreateUsers = ({ show, onHide }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("Выберите роль");
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const [searchingUsersValue, setSearchingUsersValue] = useState("");
  const [searchingUsers, setSearchingUsers] = useState([]);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const dispatch = useDispatch();
  const users = useSelector(selectUser);
  const [debouncedSearchingUsersValue] = useDebounce(searchingUsersValue, 400);

  const searchUsers = useCallback(async (inputValue) => {
    if (!inputValue) {
      setSearchingUsers([]);
      return;
    }
    setError("");
    try {
      const loadedUsers = await fetchSearchingUsers(inputValue);
      setSearchingUsers(loadedUsers);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || "Ошибка загрузки");
    }
  }, []);

  useEffect(() => {
    searchUsers(debouncedSearchingUsersValue);
  }, [debouncedSearchingUsersValue, searchUsers]);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const loadedRoles = await fetchRoles();
        setRoles(loadedRoles);
      } catch (e) {
        console.log("Ошибка загрузки!");
      }
    };
    loadRoles();
  }, []);

  const handleClose = () => {
    setError("");
  };
  const handleUser = async () => {
    try {
      setError("");
      const response = await addUserApi(userName, userRole);
      console.log(
        `Отправка ссылки пользователю на почту`,
        response.registrationLink,
      );
      setUserName("");
      setUserRole("Выберите роль");
      setError("");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Ошибка";
      setError(message);
    }
  };
  const handleDeleteUser = async (id, e) => {
    e.stopPropagation();
    setUpdatingUserId(id);
    setError("");
    try {
      const response = await fetchDeleteUser(id);
      setSearchingUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (e) {
      setError(e.response?.data?.message || "Ошибка удаления");
      console.log(error);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    setUpdatingUserId(userId);
    setError("");

    try {
      const response = await updateUserRoleApi(userId, newRole);
      if (response && response.success) {
        setSearchingUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user,
          ),
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка обновления роли");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteType = async (typeId, e) => {
    e.stopPropagation();
    try {
      setError("");
      const response = await deleteTypeApi(typeId);
      const updatedType = await fetchTypesApi();
      dispatch(setTypes(updatedType));
      handleClose();
    } catch ({ response }) {
      setError(response.data.message);
    }
  };
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Редактирование пользователей
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mb-4">
          <h2>Добавление пользователя:</h2>
          <Form.Control
            value={userName}
            placeholder="Введите email пользователя для добавления..."
            onChange={(e) => setUserName(e.target.value.trim().toLowerCase())}
          ></Form.Control>
          <div className="d-flex align-items-center justify-content-between">
            <Dropdown className="mt-2 mb-2">
              <Dropdown.Toggle>{userRole}</Dropdown.Toggle>
              <Dropdown.Menu>
                {roles.map((role) => (
                  <Dropdown.Item
                    onClick={() => setUserRole(role.name)}
                    key={role.id}
                  >
                    {role.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant={"outline-success"}
              onClick={() => {
                handleUser();
              }}
            >
              Добавить
            </Button>
          </div>
        </Form>
        <hr />
        <Form>
          <h2>Поиск пользователей:</h2>
          <Form.Control
            className="mb-2"
            value={searchingUsersValue}
            placeholder="Поиск пользователя для редактирования..."
            onChange={(e) => setSearchingUsersValue(e.target.value.trim())}
          ></Form.Control>
          <ListGroup>
            {searchingUsers.map((user) => (
              <ListGroup.Item
                className="d-flex justify-content-between"
                key={user.id}
              >
                <h5 className="d-flex align-items-center justify-content-center">
                  {user.email}
                </h5>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <Dropdown className="mt-2 mb-2">
                    <Dropdown.Toggle>{user.role}</Dropdown.Toggle>
                    <Dropdown.Menu>
                      {roles.map((role) => (
                        <Dropdown.Item
                          onClick={() => handleChangeRole(user.id, role.name)}
                          key={role.id}
                        >
                          {role.name}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <CloseButton
                    key={user.id}
                    onClick={(e) => handleDeleteUser(user.id, e)}
                  />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUsers;
