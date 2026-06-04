import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand/CreateBrand";
import CreateType from "../components/modals/CreateType/CreateType";
import CreateDevice from "../components/modals/CreateDevice/CreateDevice";
import CreateUsers from "../components/modals/CreateUsers/CreateUsers";
import { CreateTypeProvider } from "../components/modals/CreateType/CreateTypeContext";
import { CreateUsersProvider } from "../components/modals/CreateUsers/CreateUsersContext";

const AdminPage = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [usersVisible, setUsersVisible] = useState(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => {
          setTypeVisible(true);
        }}
      >
        Редактировать список типов
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => {
          setBrandVisible(true);
        }}
      >
        Рeдактировать список брендов
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => {
          setDeviceVisible(true);
        }}
      >
        Управление товарами
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => {
          setUsersVisible(true);
        }}
      >
        Редактировать пользователей
      </Button>
      <CreateBrand
        show={brandVisible}
        onHide={() => {
          setBrandVisible(false);
        }}
      />
      <CreateTypeProvider>
        <CreateType
          show={typeVisible}
          onHide={() => {
            setTypeVisible(false);
          }}
        />
      </CreateTypeProvider>
      <CreateDevice
        show={deviceVisible}
        onHide={() => {
          setDeviceVisible(false);
        }}
      />
      <CreateUsersProvider>
        <CreateUsers
          show={usersVisible}
          onHide={() => {
            setUsersVisible(false);
          }}
        />
      </CreateUsersProvider>
    </Container>
  );
};

export default AdminPage;
