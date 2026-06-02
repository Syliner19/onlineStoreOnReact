import React from "react";

const CartEmpty = () => {
  return (
    <div style={{ color: "red" }} className="d-flex justify-content-center">
      <div className="fw-bold pe-3 pt-2 pb-2"> Корзина пуста </div>
    </div>
  );
};

export default CartEmpty;
