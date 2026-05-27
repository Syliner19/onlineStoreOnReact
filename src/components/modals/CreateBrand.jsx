import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  addBrandApi,
  deleteBrandApi,
  fetchBrandApi,
} from "../../http/deviceAPI";
import { addBrand, setBrands } from "../../store/actions";

const CreateBrand = ({ show, onHide }) => {
  const [brand, setBrand] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const handleClose = () => {
    setError("");
    setBrand("");
    onHide();
  };
  const handleBrand = async (brand) => {
    try {
      setError("");
      const response = await addBrandApi(brand);
      const newBrand = response.brand;
      dispatch(addBrand(newBrand));
      handleClose();
    } catch ({ response }) {
      setError(response.data.message);
    }
  };
  const handleDeleteBrand = async (brand) => {
    try {
      setError("");
      const response = await deleteBrandApi(brand);
      const updatedBrands = await fetchBrandApi();
      dispatch(setBrands(updatedBrands));
      handleClose();
    } catch ({ response }) {
      setError(response.data.message);
      console.log(error);
    }
  };
  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Рeдактировать список брендов
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Введите название бренда..."
            onChange={(e) => {
              setBrand(e.target.value.trim().toLowerCase());
            }}
          ></Form.Control>
        </Form>
      </Modal.Body>
      <span style={{ color: "red" }} className="d-flex justify-content-center">
        {error}
      </span>
      <Modal.Footer>
        <Button
          variant={"outline-danger"}
          onClick={() => {
            setError("");
            onHide();
          }}
        >
          Закрыть
        </Button>
        <Button
          variant={"outline-success"}
          onClick={() => {
            handleBrand(brand);
          }}
        >
          Добавить
        </Button>{" "}
        <Button
          variant={"outline-primary"}
          onClick={() => {
            handleDeleteBrand(brand);
          }}
        >
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
