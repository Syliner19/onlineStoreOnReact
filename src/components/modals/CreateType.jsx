import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addTypeApi } from "../../http/deviceAPI";
import { useDispatch } from "react-redux";
import { addType } from "../../store/actions";

const CreateType = ({ show, onHide }) => {
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const handleType = async (type) => {
    try {
      setError("");
      const response = await addTypeApi(type);
      console.log(response.message);
      const newType = response.type;
      dispatch(addType(newType));
      onHide();
    } catch ({ response }) {
      setError(response.data.message);
    }
  };
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Введите название типа..."
            onChange={(e) => setType(e.target.value.trim().toLowerCase())}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <span
        style={{ color: "red" }}
        className="d-flex align-items-center justify-content-center"
      >
        {error}
      </span>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button
          variant={"outline-success"}
          onClick={() => {
            handleType(type);
          }}
        >
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateType;
