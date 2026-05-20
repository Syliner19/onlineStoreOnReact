import React, { useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Dropdown,
  Form,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { addTypeApi, deleteTypeApi, fetchTypesApi } from "../../http/deviceAPI";
import { useDispatch, useSelector } from "react-redux";
import { addType, setSelectType, setTypes } from "../../store/actions";
import { selectTypes, selectUser } from "../../store/selectors";
import { addUserApi, fetchRoles } from "../../http/userAPI";

const CreateUsers = ({ show, onHide }) => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("Выберите роль");
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector(selectUser);

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
      //   const newUser = response.user;
      //   dispatch(addUser(newUser));
      setUserName("");
      setUserRole("Выберите роль");
      setError("");
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Ошибка";
      setError(message);
    }
  };
  const handleDeleteType = async (typeId, e) => {
    e.stopPropagation();
    try {
      setError("");
      const response = await deleteTypeApi(typeId);
      const updatedType = await fetchTypesApi();
      console.log(updatedType);
      dispatch(setTypes(updatedType));
      handleClose();
    } catch ({ response }) {
      setError(response.data.message);
      console.log(error);
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
        <Form>
          <Form.Control
            value={userName}
            placeholder="Введите email пользователя..."
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
      </Modal.Body>
      {/* <ListGroup>
        {users.map((type) => (
          <ListGroup.Item
            className="d-flex justify-content-between"
            key={type.id}
            onClick={() => {
              dispatch(setSelectType(type));
            }}
          >
            {type.name}
            <CloseButton
              key={type.id}
              onClick={(e) => handleDeleteType(type.id, e)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup> */}
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button variant={"outline-success"} onClick={() => {}}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUsers;
