import {
  AUTH_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_AUTH,
} from "../actionTypes";

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: false,
  errorMsg: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_IN_SUCCESS:
      // localStorage.setItem("token", action.payload.auth_token);
      return {
        ...state,
        token: action.payload.auth_token,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case SIGN_IN_FAIL:
      // localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: true,
        errorMsg: action.payload.error,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case RESET_AUTH:
    case SIGN_OUT_SUCCESS:
      return {
        initialState,
      };
    default:
      return state;
  }
};

export default authReducer;
