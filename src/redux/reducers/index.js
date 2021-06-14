import { combineReducers } from "redux";
import authReducer from "./authReducer";
import swapReducer from "./swapReducer";
import offerReducer from "./offerReducer";

export default combineReducers({
  auth: authReducer,
  swap: swapReducer,
  offer: offerReducer,
});
