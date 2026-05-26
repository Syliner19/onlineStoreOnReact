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
  selectIsAuth,
  selectUser,
  selectUserId,
} from "../../store/selectors";
import {
  changeCheckboxDeviceFromCart,
  deleteDevicesFromCart,
} from "../../store/actions";
import {
  changeCheckboxForDeviceApi,
  deleteDeviceFromCartApi,
  fetchCartByUserId,
  fetchCheckedDevices,
} from "../../http/cartAPI";

const Cart = ({ show, onHide }) => {
  const userId = useSelector(selectUserId);
  const isAuth = useSelector(selectIsAuth);
  const [chekedCart, setChekedCart] = useState([]);
  const dispatch = useDispatch();
  const [cart, setCart] = useState({ devices: [], totalPrice: 0 });
  console.log(userId);
  useEffect(() => {
    if (!isAuth || !userId) {
      setCart({ devices: [], totalPrice: 0 });
      return;
    }
    const loadCart = async () => {
      try {
        const response = await fetchCartByUserId(userId);
        setCart(response.cart);
        const chekedResponse = await fetchCheckedDevices(userId);
        setChekedCart(chekedResponse.cart.devices);
        console.log(response);
      } catch (e) {
        console.error("Error loading cart:", e);
        setCart({ devices: [], totalPrice: 0 });
      }
    };
    loadCart();
  }, [userId, show]);

  const arrayFromDevices = cart?.devices || [];
  const totalPrice = cart?.totalPrice || 0;

  const handleChekboxChange = async (userId, deviceId) => {
    try {
      const response = await changeCheckboxForDeviceApi(userId, deviceId);
      const chekedResponse = await fetchCheckedDevices(userId);
      console.log(chekedResponse.cart.devices);
      setChekedCart(chekedResponse.cart.devices);
      console.log(response);
    } catch (e) {
      console.error("Error change chekbox:", e);
    }
  };
  const isDeviceCheked = (id) => {
    return chekedCart.some((device) => device.id === id);
  };
  const finnalyOrder = () => {
    const finalDevices = arrayFromDevices.filter((device) => device.checked);
    console.log(finalDevices);
    return finalDevices;
  };
  const handleDeleteDevice = async (userId, id) => {
    try {
      const response = await deleteDeviceFromCartApi(userId, id);
      console.log(response);
      setCart(response.data.cart);
      console.log(cart);
    } catch (e) {
      console.error("Error loading cart:", e);
      setCart({ devices: [], totalPrice: 0 });
    }
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
                checked={isDeviceCheked(device.id)}
                style={{ boxShadow: "none" }}
                onChange={() => {
                  handleChekboxChange(userId, device.id);
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
                  handleDeleteDevice(userId, device.id);
                  console.log(cart);
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
