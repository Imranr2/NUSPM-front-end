import { SIGN_IN_SUCCESS, SIGN_IN_FAIL } from "../actionTypes";
import axios from "axios";

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

export const signIn = (email, password) => {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/authenticate", {
        email: email,
        password: password,
      })
      .then((response) => dispatch(signInSuccess(response.data)))
      .catch((error) => dispatch(signInFail(error.response.data)));
  };
};
