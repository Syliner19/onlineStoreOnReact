import { combineReducers } from "redux";
import {
  SELECT_BRAND,
  SELECT_TYPE,
  SET_AUTH,
  SET_BRANDS,
  SET_DEVICES,
  SET_TYPES,
  SET_USER,
} from "./consts";

const initialAuthState = { user: "", isAuth: false };
const initialTypesState = [
  { id: 1, name: "Холодильники" },
  { id: 2, name: "Смартфоны" },
  { id: 3, name: "Ноутбуки" },
  { id: 4, name: "Телевизоры" },
];
const initialBrandsState = [
  { id: "1", name: "Apple" },
  { id: "2", name: "Samsung" },
  { id: "3", name: "Lenovo" },
  { id: "4", name: "Asus" },
];
const initialDevicesState = [
  {
    id: "1",
    name: "Iphone 12 pro",
    price: 25000,
    rating: 5,
    img: "https://msk-apple.ru/image/cache/catalog/apple12/apple%2012%20pro/apple12pro_white_1-700x700.jpg",
  },
  {
    id: "2",
    name: "Iphone 12 pro",
    price: 25000,
    rating: 5,
    img: "https://msk-apple.ru/image/cache/catalog/apple12/apple%2012%20pro/apple12pro_white_1-700x700.jpg",
  },
  {
    id: "3",
    name: "Iphone 12 pro",
    price: 25000,
    rating: 5,
    img: "https://msk-apple.ru/image/cache/catalog/apple12/apple%2012%20pro/apple12pro_white_1-700x700.jpg",
  },
  {
    id: "4",
    name: "Iphone 12 pro",
    price: 25000,
    rating: 5,
    img: "https://msk-apple.ru/image/cache/catalog/apple12/apple%2012%20pro/apple12pro_white_1-700x700.jpg",
  },
];

const authReducer = (state = initialAuthState, action) => {
  if (action.type === SET_AUTH) {
    return { ...state, isAuth: action.payload };
  }
  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
  return state;
};

const typesReducer = (state = initialTypesState, action) => {
  if (action.type === SET_TYPES) {
    return action.payload;
  }
  return state;
};
const selectedTypeReducer = (state = {}, action) => {
  if (action.type === SELECT_TYPE) {
    return action.payload;
  }
  return state;
};
const brandsReducer = (state = initialBrandsState, action) => {
  if (action.type === SET_BRANDS) {
    return action.payload;
  }
  return state;
};

const selectedBrandReducer = (state = {}, action) => {
  if (action.type === SELECT_BRAND) {
    return action.payload;
  }
  return state;
};

const devicesReducer = (state = initialDevicesState, action) => {
  if (action.type === SET_DEVICES) {
    return action.payload;
  }
  return state;
};

export const rootReducer = combineReducers({
  auth: authReducer,
  types: typesReducer,
  brands: brandsReducer,
  devices: devicesReducer,
  selectedType: selectedTypeReducer,
  selectedBrand: selectedBrandReducer,
});
