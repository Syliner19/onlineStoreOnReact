import React, { useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  selectBrands,
  selectDevices,
  selectTypes,
} from "../../store/selectors";

const CreateDevice = ({ show, onHide }) => {
  const device = useSelector(selectDevices);
  const types = useSelector(selectTypes);
  const brands = useSelector(selectBrands);
  const [info, setInfo] = useState([]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((item) => item.number !== number));
  };

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новое устройств
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map((type) => (
                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>{" "}
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>Выберите бренд</Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brand) => (
                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            placeholder="Введите название устройства..."
            className="mt-3"
          ></Form.Control>
          <Form.Control
            placeholder="Введите стоимость устройства..."
            className="mt-3"
            type="number"
          ></Form.Control>
          <Form.Control className="mt-3" type="file"></Form.Control>
          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            Добавить новое свойство
          </Button>
          {info.map((i) => (
            <Row className="mt-3" key={i.number}>
              <Col md={4}>
                <Form.Control placeholder="Введите название свойства"></Form.Control>
              </Col>
              <Col md={4}>
                <Form.Control placeholder="Введите описание свойства"></Form.Control>
              </Col>
              <Col md={4}>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    removeInfo(i.number);
                  }}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button variant={"outline-success"} onClick={onHide}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
