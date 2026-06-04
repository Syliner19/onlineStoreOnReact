import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import CreateUsersError from "./CreateUsersError";
import UserRoleDropdown from "./UserRoleDropdown";
import { CreateUsersContext } from "./CreateUsersContext";

const AddUserForm = ({ onClick }) => {
  const { userName, setUserName, userRole, setUserRole, roles, addUserError } =
    useContext(CreateUsersContext);
  return (
    <>
      <Form className="mb-4">
        <h2>Добавление пользователя:</h2>
        <Form.Control
          value={userName}
          placeholder="Введите email пользователя для добавления..."
          onChange={(e) => setUserName(e.target.value.trim().toLowerCase())}
        ></Form.Control>
        <div className="d-flex align-items-center justify-content-between">
          <UserRoleDropdown title={userRole} onChange={setUserRole} />
          <Button variant={"outline-success"} onClick={onClick}>
            Добавить
          </Button>
        </div>
      </Form>
      {addUserError !== "" && <CreateUsersError title={addUserError} />}
    </>
  );
};

export default AddUserForm;
