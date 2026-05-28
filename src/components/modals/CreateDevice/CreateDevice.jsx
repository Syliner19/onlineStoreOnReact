import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBrands,
  selectDevices,
  selectTypes,
} from "../../../store/selectors";
import { Controller, useForm } from "react-hook-form";
import { useAddDevice, useDescription } from "./hooks";
import { createFormdata } from "./helpers";

const CreateDevice = ({ show, onHide }) => {
  const types = useSelector(selectTypes);
  const brands = useSelector(selectBrands);
  const { response, addDevice } = useAddDevice();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      brand: "",
      name: "",
      price: "",
      img: null,
      description: [],
    },
  });
  const {
    description,
    addDescription,
    removeDescription,
    updateTitleDesctiption,
    updateValueDesctiption,
  } = useDescription(watch, setValue);

  const onSubmit = async (data) => {
    const formData = createFormdata(data);
    try {
      const response = await addDevice(formData);
      reset();
    } catch (e) {
      console.log("Ошибка добавления девайса", e);
    }
  };
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">
          Добавить новое устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} id="create-device-form">
          <Controller
            name="type"
            control={control}
            rules={{ required: "Выберите тип устройства" }}
            render={({ field }) => (
              <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                  {field.value || "Выберите тип"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {types.map((typeItem) => (
                    <Dropdown.Item
                      onClick={() => field.onChange(typeItem.name)}
                      key={typeItem.id}
                    >
                      {typeItem.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          />
          <Controller
            name="brand"
            control={control}
            rules={{ required: "Введите бренд" }}
            render={({ field }) => (
              <Dropdown className="mt-2 mb-2">
                <Dropdown.Toggle>
                  {field.value || "Выберите бренд"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {brands.map((brandItem) => (
                    <Dropdown.Item
                      onClick={() => field.onChange(brandItem.name)}
                      key={brandItem.id}
                    >
                      {brandItem.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          />

          <Form.Control
            placeholder="Введите название устройства..."
            {...register("name", { required: "Введите название" })}
            className="mt-3"
          ></Form.Control>
          <Form.Control
            placeholder="Введите стоимость устройства..."
            {...register("price", {
              required: "Введите цену",
              min: { value: 1, message: "Цена должна быть больше 0" },
            })}
            className="mt-3"
            type="number"
          ></Form.Control>
          <Form.Control
            {...register("img")}
            className="mt-3"
            type="file"
            accept="image/*"
          ></Form.Control>
          <hr />
          <Button variant="outline-dark" onClick={addDescription}>
            Добавить новое свойство
          </Button>
          {description.map((i, index) => (
            <Row className="mt-3" key={i.id}>
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
        </Form>
      </Modal.Body>
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
    </Modal>
  );
};

export default CreateDevice;
