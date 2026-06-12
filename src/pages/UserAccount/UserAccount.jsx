import { Button, Col, Form, Image, Row } from "react-bootstrap";
import FormInputUserAccount from "./FormInputUserAccount";
import { createFormData } from "../../components/modals/CreateDevice/helpers";
import { useUserAccountChanger, useUserInfo } from "./hooks";
import { changeUserInfo } from "../../http/userAPI";
const UserAccount = () => {
  const {
    isVisible,
    setValue,
    passwordVisibility,
    register,
    handleSubmit,
    errors,
  } = useUserAccountChanger();
  const { firstName, secondName, age, adress, img, refresh } = useUserInfo();
  if (firstName) setValue("firstName", firstName);
  if (secondName) setValue("secondName", secondName);
  if (age) setValue("age", age);
  if (adress) setValue("adress", adress);

  const onSubmit = async (data) => {
    const formData = createFormData(data);
    try {
      console.log(data);
      await changeUserInfo(formData);
      await refresh();
    } catch (e) {
      console.log("Ошибка внесения изменений", e);
    }
  };
  return (
    <>
      <Row className="ms-3 pt-3 me-3">
        <Col md={9}>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column"
            id="change-user-info"
          >
            <FormInputUserAccount
              placeholder="Имя"
              className="mt-3"
              label="firstName"
              errors={errors}
              register={register}
            />
            <FormInputUserAccount
              placeholder="Фамилия"
              className="mt-3"
              label="secondName"
              errors={errors}
              register={register}
            />
            <FormInputUserAccount
              placeholder="Возраст"
              className="mt-3"
              type="number"
              label="age"
              errors={errors}
              register={register}
              min={{ value: 0, message: "Возраст не может быть меньше 0" }}
            />
            <FormInputUserAccount
              placeholder="Адрес"
              className="mt-3"
              label="adress"
              errors={errors}
              register={register}
            />
            <FormInputUserAccount
              placeholder="Аватар"
              className="mt-3"
              type="file"
              accept="image/*"
              label="img"
              errors={errors}
              register={register}
            />
          </Form>
        </Col>
        <Col
          md={3}
          className="d-flex align-items-center justify-content-center"
        >
          <Image width="100%" height="80%" src={img} />
        </Col>
        <div className="d-flex justify-content-center align-items-center mt-3 pl-3 pr-3">
          <Button
            variant={"outline-success"}
            className="mt-3"
            form="change-user-info"
            type="submit"
          >
            Сохранить изменения
          </Button>
        </div>
      </Row>
      <Row className="ms-5 pt-3 me-5">
        <Col>
          <Form className="d-flex flex-column">
            <Form.Control
              placeholder="Старый пароль"
              className="mt-3"
              type={isVisible ? "" : "password"}
              label="oldPassword"
            />

            <Form.Control
              placeholder="Новый пароль"
              className="mt-3"
              type={isVisible ? "" : "password"}
              label="newPassword"
            />

            <Form.Control
              placeholder="Повторите новый пароль"
              className="mt-3"
              type={isVisible ? "" : "password"}
              label="confirmNewPassword"
            />
          </Form>
        </Col>

        <div className="d-flex justify-content-center align-items-center mt-3 pl-3 pr-3 gap-3">
          <Button variant={"outline-success"} className="mt-3">
            Изменить пароль
          </Button>{" "}
          <Button
            variant={"outline-success"}
            className="mt-3"
            onClick={() => passwordVisibility()}
          >
            {isVisible ? "Скрыть пароли" : "Показать пароли"}
          </Button>
        </div>
      </Row>
    </>
  );
};

export default UserAccount;
