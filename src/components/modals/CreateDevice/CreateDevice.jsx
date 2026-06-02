import { Modal } from "react-bootstrap";
import FormActions from "./FormActions.jsx";
import { FormProvider } from "./FormContext.jsx";
import DeviceForm from "./DeviceForm.jsx";

const CreateDevice = ({ show, onHide }) => {
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormProvider>
          <DeviceForm />
        </FormProvider>
      </Modal.Body>
      <FormActions onHide={onHide} />
    </Modal>
  );
};

export default CreateDevice;
