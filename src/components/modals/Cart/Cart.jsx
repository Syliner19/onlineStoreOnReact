import React, { useState, useEffect } from "react";
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
import {
  useGetCart,
  useGetCheckedDevicesFromCart,
  useDeleteDeviceFromCart,
} from "./hooks";
import { getCheckedDevicesFromCart } from "./helpers";

const Cart = ({ onHide }) => {
  const [cart, setCart] = useState({ devices: [], totalPrice: 0 });
  const { deleteDevice } = useDeleteDeviceFromCart();
  const { checkDevice } = useGetCheckedDevicesFromCart();
  const { cart: initialCart } = useGetCart();

  const handleChekboxChange = async (id) => {
    const resp = await checkDevice(id);
    setCart(resp.cart);
  };

  const handleDeleteDevice = async (id) => {
    const resp = await deleteDevice(id);
    setCart(resp.cart);
  };

  useEffect(() => {
    setCart(initialCart);
  }, [initialCart])

  return (
    <Modal size="lg" centered show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Корзина</Modal.Title>
      </Modal.Header>
      {cart.devices.length === 0 && (
        <div style={{ color: "red" }} className="d-flex justify-content-center">
          <div className="fw-bold pe-3 pt-2 pb-2"> Корзина пуста </div>
        </div>
      )}
      <ListGroup className="d-flex">
        {cart.devices.map((device) => (
          <ListGroup.Item
            className="d-flex justify-content-between w-100"
            key={device.id}
          >
            <div className="d-flex align-items-center gap-3 w-100">
              <Form.Check
                type="checkbox"
                label=""
                className="m-0"
                checked={device.checked}
                style={{ boxShadow: "none" }}
                onChange={() => {
                  handleChekboxChange(device.id);
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
          <div className="fw-bold pe-3 pt-2 pb-2">
            Итого: {cart.totalPrice} ₽
          </div>
        </div>
      </ListGroup>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button
          variant={"outline-success"}
          onClick={() => getCheckedDevicesFromCart(cart)}
        >
          Оформить заказ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
