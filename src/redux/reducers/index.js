import { combineReducers } from "redux";
import authReducer from "./authReducer";
import swapReducer from "./swapReducer";

export default combineReducers({
  auth: authReducer,
  swap: swapReducer,
});
