import React, { useState } from "react";
import { Button, CloseButton, Form, ListGroup, Modal } from "react-bootstrap";
import { addTypeApi, deleteTypeApi, fetchTypesApi } from "../../http/deviceAPI";
import { useDispatch, useSelector } from "react-redux";
import { addType, setSelectType, setTypes } from "../../store/actions";
import { selectTypes } from "../../store/selectors";

const CreateType = ({ show, onHide }) => {
  const [type, setType] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const types = useSelector(selectTypes);
  const handleClose = () => {
    setError("");
  };
  const handleType = async (typeName) => {
    try {
      setError("");
      const response = await addTypeApi(typeName);
      console.log(response.message);
      const newType = response.type;
      dispatch(addType(newType));
      setType("");
      setError("");
    } catch ({ response }) {
      setError(response.data.message);
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
          Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={type}
            placeholder="Введите название типа..."
            onChange={(e) => setType(e.target.value.trim().toLowerCase())}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <ListGroup>
        {types.map((type) => (
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
      </ListGroup>
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
