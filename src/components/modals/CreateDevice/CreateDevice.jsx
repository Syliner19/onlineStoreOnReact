import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectBrands, selectTypes } from "../../../store/selectors";
import FormActions from "./FormActions.jsx";
import { FormProvider } from "./FormContext.jsx";
import DeviceForm from "./DeviceForm.jsx";

const CreateDevice = ({ show, onHide }) => {
  const types = useSelector(selectTypes);
  const brands = useSelector(selectBrands);

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormProvider>
          <DeviceForm types={types} brands={brands} />
        </FormProvider>
      </Modal.Body>
      <FormActions onHide={onHide} />
    </Modal>
  );
};

export default CreateDevice;
