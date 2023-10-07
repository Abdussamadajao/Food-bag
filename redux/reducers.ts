import { combineReducers } from "@reduxjs/toolkit";
import basketReducer from "./slices/cartSlice";
import authReducer from "@/redux/slices/authSlice";

const rootReducer = combineReducers({
  cart: basketReducer,
  auth: authReducer,
});

export default rootReducer;
