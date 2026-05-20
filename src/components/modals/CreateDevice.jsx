import React, { useRef, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBrands,
  selectDevices,
  selectTypes,
} from "../../store/selectors";
import { addDeviceApi } from "../../http/deviceAPI";
import { setDevices } from "../../store/actions";

const CreateDevice = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const devices = useSelector(selectDevices);
  const types = useSelector(selectTypes);
  const brands = useSelector(selectBrands);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(5);
  const [type, setType] = useState("Выберите тип");
  const [brand, setBrand] = useState("Выберите бренд");
  const [description, setDescription] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  console.log(description);
  console.log(imageFile);
  const clearInputFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setImageFile(null);
    }
  };

  const handleClose = () => {
    setName("");
    setPrice("");
    setRating(5);
    setBrand("Выберите бренд");
    setType("Выберите тип");
    setImageFile(null);
    setDescription([]);
    onHide();
  };
  const clearForm = () => {
    setName("");
    setPrice("");
    setRating(5);
    setBrand("Выберите бренд");
    setType("Выберите тип");
    setDescription([]);
    clearInputFile();
  };
  const addDescription = () => {
    setDescription([
      ...description,
      {
        title: "",
        value: "",
        id: Date.now(),
      },
    ]);
  };

  const removeDescription = (id) => {
    setDescription(description.filter((desc) => desc.id !== id));
  };

  const updateTitleDesctiption = (id, value) => {
    setDescription(
      description.map((desc) =>
        desc.id === id ? { ...desc, title: value } : desc,
      ),
    );
  };
  const updateValueDesctiption = (id, value) => {
    setDescription(
      description.map((desc) =>
        desc.id === id ? { ...desc, value: value } : desc,
      ),
    );
  };
  const handleFormSubmit = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("rating", rating);
    formData.append("type", type);
    formData.append("brand", brand);
    formData.append("description", JSON.stringify(description));
    if (imageFile) {
      formData.append("img", imageFile);
    }
    try {
      const newDevice = await addDeviceApi(formData);
      console.log(newDevice);
      dispatch(setDevices([...devices, newDevice]));
      clearForm();
    } catch (e) {
      console.log("Ошибка при добавлении товара");
    }
  };

  return (
    <Modal size="lg" centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{type}</Dropdown.Toggle>
            <Dropdown.Menu>
              {types.map((typeItem) => (
                <Dropdown.Item
                  onClick={() => setType(typeItem.name)}
                  key={typeItem.id}
                >
                  {typeItem.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{brand}</Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brandItem) => (
                <Dropdown.Item
                  onClick={() => setBrand(brandItem.name)}
                  key={brandItem.id}
                >
                  {brandItem.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            placeholder="Введите название устройства..."
            className="mt-3"
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
          <Form.Control
            value={price}
            placeholder="Введите стоимость устройства..."
            className="mt-3"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
          ></Form.Control>
          <Form.Control
            ref={fileInputRef}
            className="mt-3"
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            accept="image/*"
          ></Form.Control>
          <hr />
          <Button variant="outline-dark" onClick={addDescription}>
            Добавить новое свойство
          </Button>
          {description.map((i) => (
            <Row className="mt-3" key={i.id}>
              <Col md={4}>
                <Form.Control
                  placeholder="Введите название свойства"
                  onChange={(e) => updateTitleDesctiption(i.id, e.target.value)}
                ></Form.Control>
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Введите описание свойства"
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant={"outline-success"} onClick={handleFormSubmit}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
