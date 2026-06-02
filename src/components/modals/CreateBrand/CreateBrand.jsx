import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { deleteBrandApi } from "../../../http/brandsAPI";
import CreateBrandFooter from "./CreateBrandFooter";
import BrandNotFound from "./BrandNotFound";
import CreateBrandForm from "./CreateBrandForm";
import { useAddBrand, useDeleteBrand } from "./hooks";

const CreateBrand = ({ show, onHide }) => {
  const [brand, setBrand] = useState("");
  const [error, setError] = useState(null);
  const { addBrand } = useAddBrand();
  const { deleteBrand } = useDeleteBrand();

  const handleClose = () => {
    setError("");
    setBrand("");
    onHide();
  };

  const handleBrand = async (brand) => {
    try {
      setError("");
      const response = await addBrand(brand);
      handleClose();
    } catch ({ response }) {
      setError(response.data.message);
    }
  };
  const handleDeleteBrand = async (brand) => {
    try {
      setError("");
      const response = await deleteBrand(brand);
      handleClose();
    } catch ({ response }) {
      setError(response.data.message);
    }
  };
  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Рeдактировать список брендов
        </Modal.Title>
      </Modal.Header>
      <CreateBrandForm onChange={setBrand} />
      {error && <BrandNotFound error={error} />}
      <CreateBrandFooter
        handleBrand={handleBrand}
        handleDeleteBrand={handleDeleteBrand}
        handleClose={handleClose}
        brand={brand}
      />
    </Modal>
  );
};

export default CreateBrand;
