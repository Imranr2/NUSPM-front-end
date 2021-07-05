import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_OUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_AUTH,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_FAIL,
  FETCH_USER_FAIL,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  PING_HEROKU_SUCCESS,
  PING_HEROKU_REQUEST,
  PING_HEROKU_FAIL,
} from "../actionTypes";

export const resetAuth = () => {
  return {
    type: RESET_AUTH,
  };
};

export const signInRequest = () => {
  return {
    type: SIGN_IN_REQUEST,
  };
};

export const signInSuccess = (data) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: data,
  };
};

export const signInFail = (error) => {
  return {
    type: SIGN_IN_FAIL,
    payload: error,
  };
};

export const signOutSuccess = () => {
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

export const registerFail = (error) => {
  return {
    type: REGISTER_FAIL,
    payload: error,
  };
};

export const changePasswordRequest = () => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
  };
};

export const changePasswordSuccess = () => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  };
};

export const changePasswordFail = (error) => {
  return {
    type: CHANGE_PASSWORD_FAIL,
    payload: error,
  };
};

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = () => {
  return {
    type: FETCH_USER_SUCCESS,
  };
};

export const fetchUserFail = (error) => {
  return {
    type: FETCH_USER_FAIL,
    payload: error,
  };
};

export const pingHerokuRequest = () => {
  return {
    type: PING_HEROKU_REQUEST
  }
}

export const pingHerokuSuccess = () => {
  return {
    type: PING_HEROKU_SUCCESS,
  };
};

export const pingHerokuFail = () => {
  return {
    type: PING_HEROKU_FAIL,
  };
};