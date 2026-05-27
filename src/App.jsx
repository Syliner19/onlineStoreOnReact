import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";
import { selectUser } from "./store/selectors";
import Cart from "./components/modals/Cart/Cart.jsx";
import { useState } from "react";

function App() {
  const [cartVisible, setCartVisible] = useState(false);
  return (
    <BrowserRouter>
      <NavBar setCartVisible={setCartVisible} />
      <AppRouter></AppRouter>
      {cartVisible ? (
        <Cart
          onHide={() => {
            setCartVisible(false);
          }}
        />
      ) : null}
    </BrowserRouter>
  );
}

export default App;
