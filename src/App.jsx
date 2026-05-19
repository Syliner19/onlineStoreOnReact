import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useSelector } from "react-redux";
import { selectUser } from "./store/selectors";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter></AppRouter>
    </BrowserRouter>
  );
}

export default App;
