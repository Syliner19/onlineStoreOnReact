import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  selectCartIsCheked,
  selectUser,
} from "../../store/selectors";
import { fetchCartItemsAPI } from "../../http/cartAPI";
import {
  changeCheckboxDeviceFromCart,
  deleteDevicesFromCart,
} from "../../store/actions";

const Cart = ({ show, onHide }) => {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [devices, setDevices] = useState([]);
  const userId = user.id;
  console.log(Object.entries(cart));
  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await fetchCartItemsAPI(userId, cart);
        console.log(response);
        setDevices(response.data);
      } catch (e) {
        console.error("Error loading cart:", e);
        setDevices([]);
      }
    };
    loadCart();
  }, [cart, userId, show]);

  const getDevicesArray = () => {
    if (!cart) {
      return [];
    }
    if (!devices) {
      return [];
    }
    return devices.cart?.devices ?? [];
  };
  const getTotalPrice = () => {
    if (!cart || !devices) {
      return null;
    }
    return devices?.cart?.totalPrice;
  };
  const totalPrice = getTotalPrice();
  const arrayFromDevices = getDevicesArray();

  const handleChekboxChange = (deviceId) => {
    dispatch(changeCheckboxDeviceFromCart(deviceId));
    setDevices((prev) => {
      return {
        ...prev,
        cart: {
          ...prev.cart,
          devices: prev.cart.devices.map((device) =>
            device.id === deviceId
              ? { ...device, checked: !device.checked }
              : device,
          ),
        },
      };
    });
  };
  const isDeviceCheked = (id) => {
    return cart[id]?.checked ?? false;
  };
  const finnalyOrder = () => {
    const finalDevices = arrayFromDevices.filter((device) => device.checked);
    console.log(finalDevices);
    return finalDevices;
  };
  const handleDeleteDevice = (id) => {
    const devicesWitoutDeleted = arrayFromDevices.filter(
      (device) => device.id !== id,
    );
    setDevices(devicesWitoutDeleted);
    dispatch(deleteDevicesFromCart(id));
  };
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Корзина</Modal.Title>
      </Modal.Header>
      {arrayFromDevices.length === 0 && (
        <div style={{ color: "red" }} className="d-flex justify-content-center">
          <div className="fw-bold pe-3 pt-2 pb-2"> Корзина пуста </div>
        </div>
      )}
      <ListGroup className="d-flex">
        {arrayFromDevices.map((device) => (
          <ListGroup.Item
            className="d-flex justify-content-between w-100"
            key={device.id}
          >
            <div className="d-flex align-items-center gap-3 w-100">
              <Form.Check
                type="checkbox"
                label=""
                className="m-0"
                style={{ boxShadow: "none" }}
                checked={isDeviceCheked(device.id)}
                onChange={() => {
                  handleChekboxChange(device.id);
                  console.log(devices);
                }}
              />
              <div style={{ width: 50 }}>
                <Image width={50} height={50} rounded src={device.img} />
              </div>
              <div className="flex-grow-1 ">
                <h5 className="mb-0 justify-content-center">{device.name}</h5>
                <small className="text-muted justify-content-center">
                  {device.brand}
                </small>
              </div>{" "}
              <div className="text-end">
                <div className="fw-bold">{device.count} шт.</div>
              </div>
              <div className="text-end">
                <div className="fw-bold">{device.price} ₽</div>
                <small className="text-muted">за шт.</small>
              </div>
              <CloseButton
                onClick={() => {
                  handleDeleteDevice(device.id);
                }}
              />
            </div>
          </ListGroup.Item>
        ))}
        <div className="d-flex justify-content-end">
          <div className="fw-bold pe-3 pt-2 pb-2"> Итого: {totalPrice} ₽</div>
        </div>
      </ListGroup>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button variant={"outline-success"} onClick={finnalyOrder}>
          Оформить заказ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
