import React from "react";
import { Form, Modal } from "react-bootstrap";

const CreateBrandForm = ({ onChange }) => {
  return (
    <Modal.Body>
      <Form>
        <Form.Control
          placeholder="Введите название бренда..."
          onChange={(e) => {
            onChange(e.target.value.trim().toLowerCase());
          }}
        ></Form.Control>
      </Form>
    </Modal.Body>
  );
};

export default CreateBrandForm;
