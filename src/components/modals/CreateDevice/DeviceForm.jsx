import React, { useContext } from "react";
import { FormContext } from "./FormContext";
import { useAddDevice } from "./hooks";
import { createFormData } from "./helpers";
import { Form } from "react-bootstrap";
import UniversalDropdown from "./UniversalDropdown";
import FormInputs from "./FormInputs";
import DescriptionField from "./DescriptionField";

const DeviceForm = () => {
  const { handleSubmit, reset, types, brands } = useContext(FormContext);
  const { addDevice } = useAddDevice();

  const onSubmit = async (data) => {
    const formData = createFormData(data);
    try {
      const response = await addDevice(formData);
      reset();
    } catch (e) {
      console.log("Ошибка добавления девайса", e);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} id="create-device-form">
      <UniversalDropdown name="type" items={types} placeholder="Выберите тип" />
      <UniversalDropdown
        name="brand"
        items={brands}
        placeholder="Выберите бренд"
      />
      <FormInputs
        label="name"
        type="text"
        placeholder="Введите название устройства..."
      />
      <FormInputs
        label="price"
        type="number"
        placeholder="Введите стоимость устройства..."
        min={{ value: 1, message: "Цена должна быть больше 0" }}
      />
      <FormInputs
        label="img"
        type="file"
        placeholder="Введите стоимость устройства..."
        accept="image/*"
      />
      <hr />
      <DescriptionField />
    </Form>
  );
};

export default DeviceForm;
