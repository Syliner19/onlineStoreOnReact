import { combineReducers } from "redux";
import {
  ADD_BRAND,
  ADD_DEVICE_TO_CART,
  ADD_TYPE,
  CHANGE_CHEKBOX_DEVICE_FROM_CART,
  DELETE_BRAND,
  SELECT_BRAND,
  SELECT_TYPE,
  SET_AUTH,
  SET_BRANDS,
  SET_DEVICES,
  SET_TYPES,
  SET_USER,
} from "./consts";

const initialAuthState = {
  user: { id: "", email: "", role: "" },
  isAuth: false,
};
const initialTypesState = [];
const initialBrandsState = [];
const initialDevicesState = [];

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
  if (action.type === ADD_TYPE) {
    console.log(action.payload);
    console.log(state);
    const isTypeExist = state.some((type) => type.name === action.payload.name);
    if (isTypeExist) {
      return state;
    }
    return [...state, action.payload];
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
  if (action.type === ADD_BRAND) {
    const isBrandExist = state.some(
      (brand) => brand.name === action.payload.name,
    );
    console.log(action.payload);
    console.log(state);
    if (isBrandExist) {
      return state;
    }
    return [...state, action.payload];
  }
  if (action.type === DELETE_BRAND) {
    return state.filter((brand) => brand.name !== action.payload.name);
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
const cartReducer = (state = {}, action) => {
  if (action.type === ADD_DEVICE_TO_CART) {
    const { id, count = 1 } = action.payload;
    if (state[id]) {
      return {
        ...state,
        [id]: { ...state[id], count: state[id].count + count },
      };
    } else {
      return { ...state, [id]: { cheked: false, count: count } };
    }
  }
  if (action.type === CHANGE_CHEKBOX_DEVICE_FROM_CART) {
    const { id } = action.payload;
    return { ...state, [id]: { ...state[id], cheked: !state[id].cheked } };
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
  cart: cartReducer,
});
