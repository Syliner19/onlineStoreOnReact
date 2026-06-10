import { Modal } from "react-bootstrap";

const CreateTypeHeader = ({ title }) => {
  return (
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
    </Modal.Header>
  );
};

export default CreateTypeHeader;
