import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addBrandApi } from "../../http/deviceAPI";
import { addBrand } from "../../store/actions";

const CreateBrand = ({ show, onHide }) => {
  const [brand, setBrand] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const handleBrand = async (brand) => {
    try {
      setError("");
      const response = await addBrandApi(brand);
      console.log(response.message);
      const newBrand = response.brand;
      dispatch(addBrand(newBrand));
      onHide();
    } catch ({ response }) {
      setError(response.data.message);
    }
  };
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Введите название типа..."
            onChange={(e) => {
              setBrand(e.target.value.trim().toLowerCase());
            }}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
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
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
