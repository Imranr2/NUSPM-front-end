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

export const authError = () => {
  return {
    type: AUTH_ERROR,
  };
};

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
