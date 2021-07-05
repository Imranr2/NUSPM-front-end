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
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_FAIL,
  PING_HEROKU_FAIL,
  PING_HEROKU_REQUEST,
  PING_HEROKU_SUCCESS,
  RESET_AUTH,
} from "../actionTypes";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,

  loginLoading: false,
  registerLoading: false,
  updateLoading: false,
  fetchLoading: false,
  pingHerokuLoading: false,

  loginError: false,
  registerError: false,
  updateError: false,
  fetchError: false,
  pingHerokuError: false,

  loginSuccess: false,
  registerSuccess: false,
  updateSuccess: false,
  fetchSuccess: false,
  pingHerokuSuccess: false,

  errorMsg: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case PING_HEROKU_REQUEST:
      return {
        ...state,
        pingHerokuLoading: true,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        registerLoading: true,
      };
    case SIGN_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
      };
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        updateLoading: true,
      };
    case FETCH_USER_REQUEST:
      return {
        ...state,
        fetchLoading: true,
      };

    case PING_HEROKU_SUCCESS:
      return {
        ...state,
        pingHerokuLoading: false,
        pingHerokuSuccess: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        registerSuccess: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.auth_token,
        isAuthenticated: true,
        loginLoading: false,
        loginSuccess: true,
        user: action.payload.user,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        fetchLoading: false,
        fetchSuccess: true,
      };
    case SIGN_OUT_SUCCESS:
      return {
        initialState,
      };

    case PING_HEROKU_FAIL:
      return {
        ...state,
        pingHerokuLoading: false,
        pingHerokuError: true,
        errorMsg: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        registerLoading: false,
        registerError: true,
        errorMsg: action.payload,
      };
    case SIGN_IN_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loginLoading: false,
        loginError: true,
        errorMsg: action.payload,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        updateLoading: false,
        updateError: true,
        errorMsg: action.payload,
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        fetchLoading: false,
        fetchError: true,
        errorMsg: action.payload,
      };

    case RESET_AUTH:
      return {
        ...state,
        loginLoading: false,
        registerLoading: false,
        updateLoading: false,
        fetchLoading: false,

        loginError: false,
        registerError: false,
        updateError: false,
        fetchError: false,

        loginSuccess: false,
        registerSuccess: false,
        updateSuccess: false,
        fetchSuccess: false,
        errorMsg: [],
      };
    default:
      return state;
  }
};

export default authReducer;
