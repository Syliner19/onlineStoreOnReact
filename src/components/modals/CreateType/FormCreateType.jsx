import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { CreateTypeContext } from "./CreateTypeContext";

const FormCreateType = () => {
  const { type, setType } = useContext(CreateTypeContext);

  return (
    <Form>
      <Form.Control
        value={type}
        placeholder="Введите название типа..."
        onChange={(e) => setType(e.target.value.trim().toLowerCase())}
      ></Form.Control>
    </Form>
  );
};

export default FormCreateType;
