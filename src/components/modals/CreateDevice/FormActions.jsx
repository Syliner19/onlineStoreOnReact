import { Button, Modal } from "react-bootstrap";

const FormActions = ({ onHide }) => {
  return (
    <Modal.Footer>
      <Button variant={"outline-danger"} onClick={onHide}>
        Закрыть
      </Button>
      <Button
        variant={"outline-success"}
        type="submit"
        form="create-device-form"
      >
        Добавить
      </Button>
    </Modal.Footer>
  );
};

export default FormActions;
