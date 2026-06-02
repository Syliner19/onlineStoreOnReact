import React from "react";
import { Button, Modal } from "react-bootstrap";

const CreateBrandFooter = ({
  brand,
  handleBrand,
  handleDeleteBrand,
  handleClose,
}) => {
  return (
    <Modal.Footer>
      <Button variant={"outline-danger"} onClick={handleClose}>
        Закрыть
      </Button>
      <Button
        variant={"outline-success"}
        onClick={() => {
          handleBrand(brand);
        }}
      >
        Добавить
      </Button>
      <Button
        variant={"outline-primary"}
        onClick={() => {
          handleDeleteBrand(brand);
        }}
      >
        Удалить
      </Button>
    </Modal.Footer>
  );
};

export default CreateBrandFooter;
