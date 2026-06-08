import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar.jsx";
import { useSelector } from "react-redux";
import { selectUser } from "./store/selectors";
import Cart from "./components/modals/Cart/Cart.jsx";
import { useState } from "react";
import { UserProvider } from "./context/userContext.jsx";

function App() {
  const [cartVisible, setCartVisible] = useState(false);
  return (
    <BrowserRouter>
      <UserProvider>
        <NavBar setCartVisible={setCartVisible} />
        <AppRouter />
        {cartVisible ? (
          <Cart
            onHide={() => {
              setCartVisible(false);
            }}
          />
        ) : null}
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
