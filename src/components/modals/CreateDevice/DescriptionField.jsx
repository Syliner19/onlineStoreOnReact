import { useContext } from "react";
import { useDescription } from "./hooks";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormContext } from "./FormContext";

const DescriptionField = () => {
  const { setValue, control } = useContext(FormContext);
  const {
    description,
    addDescription,
    removeDescription,
    updateTitleDesctiption,
    updateValueDesctiption,
  } = useDescription(control, setValue);

  return (
    <>
      <Button variant="outline-dark" onClick={addDescription}>
        Добавить новое свойство
      </Button>
      {description.map((i, index) => (
        <Row className="mt-3" key={index}>
          <Col md={4}>
            <Form.Control
              placeholder="Введите название свойства"
              value={i.title}
              onChange={(e) => updateTitleDesctiption(i.id, e.target.value)}
            ></Form.Control>
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Введите описание свойства"
              value={i.value}
              onChange={(e) => updateValueDesctiption(i.id, e.target.value)}
            ></Form.Control>
          </Col>
          <Col md={4}>
            <Button
              variant="outline-danger"
              onClick={() => {
                removeDescription(i.id);
              }}
            >
              Удалить
            </Button>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default DescriptionField;
