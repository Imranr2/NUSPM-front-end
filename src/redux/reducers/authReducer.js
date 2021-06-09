import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  RESET_AUTH,
} from "../actionTypes";

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  loginError: false,
  registerError: false,
  updateError: false,
  success: false,
  errorMsg: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case SIGN_IN_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.auth_token,
        isAuthenticated: true,
        isLoading: false,
        success: true,
        user: action.payload.user,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        registerError: true,
        errorMsg: action.payload,
      };
    case SIGN_IN_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        loginError: true,
        errorMsg: action.payload,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        updateError: true,
        errorMsg: action.payload,
      };
    case REGISTER_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        initialState,
      };
    case RESET_AUTH:
      return {
        ...state,
        loginError: false,
        registerError: false,
        updateError: false,
        errorMsg: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
