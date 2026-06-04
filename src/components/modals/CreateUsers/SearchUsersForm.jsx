import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { CreateUsersContext } from "./CreateUsersContext";

const SearchUsersForm = () => {
  const { searchingUsersValue, setSearchingUsersValue } =
    useContext(CreateUsersContext);
  return (
    <Form>
      <h2>Поиск пользователей:</h2>
      <Form.Control
        className="mb-2"
        value={searchingUsersValue}
        placeholder="Поиск пользователя для редактирования..."
        onChange={(e) => setSearchingUsersValue(e.target.value.trim())}
      ></Form.Control>
    </Form>
  );
};

export default SearchUsersForm;
