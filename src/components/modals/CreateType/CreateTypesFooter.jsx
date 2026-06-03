import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { CreateTypeContext } from "./CreateTypeContext";

const CreateTypesFooter = ({ onHide, onClick }) => {
  const { type } = useContext(CreateTypeContext);
  return (
    <Modal.Footer>
      <Button variant={"outline-danger"} onClick={onHide}>
        Закрыть
      </Button>
      <Button
        variant={"outline-success"}
        onClick={() => {
          onClick(type);
        }}
      >
        Добавить
      </Button>
    </Modal.Footer>
  );
};

export default CreateTypesFooter;
