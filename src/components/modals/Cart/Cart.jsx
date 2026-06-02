import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  useChekedDeviceFromCart,
  useDeleteDeviceFromCart,
  useGetCart,
} from "./hooks";
import { getCheckedDevicesFromCart } from "./helpers";
import CartList from "./CartList";
import CartFooter from "./CartFooter";
import CartEmpty from "./CartEmpty";

const Cart = ({ onHide }) => {
  const [cart, setCart] = useState({ devices: [], totalPrice: 0 });
  const { deleteDevice } = useDeleteDeviceFromCart();
  const { checkDevice } = useChekedDeviceFromCart();
  const { cart: initialCart, error, isLoading, trigger } = useGetCart();

  useEffect(() => {
    setCart(initialCart);
  }, [initialCart]);

  const handleChekboxChange = async (id) => {
    const resp = await checkDevice(id);
    setCart(resp.cart);
    trigger();
  };

  const handleDeleteDevice = async (id) => {
    const resp = await deleteDevice(id);
    setCart(resp.cart);
    trigger();
  };

  const isEmpty = cart?.devices.length === 0;

  return (
    <Modal size="lg" centered show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Корзина</Modal.Title>
      </Modal.Header>
      {isEmpty ? (
        <CartEmpty />
      ) : (
        <CartList
          cart={cart}
          handleChekboxChange={handleChekboxChange}
          handleDeleteDevice={handleDeleteDevice}
        />
      )}

      <CartFooter
        onHide={onHide}
        getCheckedDevicesFromCart={getCheckedDevicesFromCart}
      />
    </Modal>
  );
};

export default Cart;
