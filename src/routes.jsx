import AdminPage from "./pages/AdminPage";
import Auth from "./pages/AuthOrLoginPage/Auth";
import Basket from "./pages/Basket";
import CompleteRegistration from "./pages/CompleteRegistrationPage/CompleteRegistration";
import DevicePage from "./pages/DevicePage/DevicePage";
import Shop from "./pages/Shop";
import UserAccount from "./pages/UserAccount/UserAccount.jsx";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  COMPLETE_REGISTRATION_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  USER_ACCOUNT_ROUTE,
} from "./utils/const";

export const authRoutes = [
  { path: BASKET_ROUTE, element: <Basket /> },
  { path: USER_ACCOUNT_ROUTE, element: <UserAccount /> },
];
export const publicRoutes = [
  { path: SHOP_ROUTE, element: <Shop /> },
  { path: DEVICE_ROUTE + `/:id`, element: <DevicePage /> },
  { path: REGISTRATION_ROUTE, element: <Auth /> },
  { path: LOGIN_ROUTE, element: <Auth /> },
  { path: COMPLETE_REGISTRATION_ROUTE, element: <CompleteRegistration /> },
  { path: USER_ACCOUNT_ROUTE, element: <UserAccount /> },
];
export const adminRoutes = [
  { path: ADMIN_ROUTE, element: <AdminPage /> },
  { path: BASKET_ROUTE, element: <Basket /> },
  { path: USER_ACCOUNT_ROUTE, element: <UserAccount /> },
];
