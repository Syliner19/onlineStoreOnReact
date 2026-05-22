import React, { useEffect } from "react";
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
import { useSelector } from "react-redux";
import { selectCart, selectUser } from "../../store/selectors";
import { fetchCartItemsAPI } from "../../http/cartAPI";

const Cart = ({ show, onHide }) => {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  console.log(Object.entries(cart));
  useEffect(() => {
    const loadCart = async () => {
      const userId = user && user !== "0" ? String(user) : "guest";
      const response = await fetchCartItemsAPI(userId, cart);
      console.log(response);
    };
    loadCart();
  }, [cart, user, show]);
  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Корзина</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <ListGroup className="d-flex">
        <ListGroup.Item className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center gap-3 w-100">
            <Form.Check
              type="checkbox"
              label=""
              className="m-0"
              style={{ boxShadow: "none" }}
            />
            <div style={{ width: 50 }}>
              <Image width={50} height={50} rounded />
            </div>
            <div className="flex-grow-1 ">
              <h5 className="mb-0 justify-content-center">iPhone 12</h5>
              <small className="text-muted justify-content-center">Apple</small>
            </div>
            <div className="text-end">
              <div className="fw-bold">10 000 ₽</div>
              <small className="text-muted">за шт.</small>
            </div>
            <CloseButton />
          </div>
        </ListGroup.Item>
      </ListGroup>
      <Modal.Footer>
        <Button variant={"outline-danger"} onClick={onHide}>
          Закрыть
        </Button>
        <Button variant={"outline-success"}>Оформить заказ</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Cart;
