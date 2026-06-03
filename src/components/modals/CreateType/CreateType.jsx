import React, { useCallback, useContext } from "react";
import { Modal } from "react-bootstrap";
import FormCreateType from "./FormCreateType";
import CreateTypeError from "./CreateTypeError";
import CreateTypesFooter from "./CreateTypesFooter";
import TypesList from "./TypesList";
import CreateTypeHeader from "./CreateTypeHeader";
import { CreateTypeContext } from "./CreateTypeContext";

const CreateType = ({ show, onHide }) => {
  const { addType, deleteType, setError, setType, getTypes, error } =
    useContext(CreateTypeContext);

  const handleClose = () => {
    setType("");
    setError("");
  };

  const handleType = useCallback(
    async (typeName) => {
      try {
        setError("");
        const response = await addType(typeName);
        await getTypes();
        handleClose();
      } catch ({ response }) {
        setError(response.data.message);
      }
    },
    [getTypes, addType],
  );

  const handleDeleteType = useCallback(
    async (typeId) => {
      try {
        setError("");
        const response = await deleteType(typeId);
        await getTypes();
      } catch ({ response }) {
        setError(response.data.message);
      }
    },
    [getTypes, deleteType],
  );

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <CreateTypeHeader title="Добавить новый тип" />
      <Modal.Body>
        <FormCreateType />
        {error && <CreateTypeError />}
      </Modal.Body>
      <TypesList onClick={handleDeleteType} />
      <CreateTypesFooter onClick={handleType} onHide={onHide} />
    </Modal>
  );
};

export default CreateType;
