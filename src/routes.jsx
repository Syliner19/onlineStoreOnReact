import AdminPage from "./pages/AdminPage";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import DevicePage from "./pages/DevicePage";
import Shop from "./pages/Shop";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "./utils/const";

export const authRoutes = [
  { path: ADMIN_ROUTE, element: <AdminPage /> },
  { path: BASKET_ROUTE, element: <Basket /> },
];
export const publicRoutes = [
  { path: SHOP_ROUTE, element: <Shop /> },
  { path: DEVICE_ROUTE + `/:id`, element: <DevicePage /> },
  { path: REGISTRATION_ROUTE, element: <Auth /> },
  { path: LOGIN_ROUTE, element: <Auth /> },
];
