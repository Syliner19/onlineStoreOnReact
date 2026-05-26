export const setLocalStorageForCart = (value) => {
  localStorage.setItem("cart", JSON.stringify(value));
  return value;
};

export const getLocalStorageForCart = () => {
  let result = {};
  try {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      result = JSON.parse(cartData);
    } else {
      setLocalStorageForCart(result);
    }
    return result;
  } catch (e) {
    console.log("Ошибка парсинга", e);
    setLocalStorageForCart(result);
    return result;
  }
};
