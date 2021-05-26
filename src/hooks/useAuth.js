import { useState } from "react";
import {
  authError,
  signInRequest,
  signInSuccess,
  signInFail,
  signOutSuccess,
  registerRequest,
  registerSuccess,
  registerFail,
  resetAuth,
} from "../redux/actions/authActions";
import axios from "axios";

const setToken = (response) => {
  if (response.status === 200) {
    localStorage.setItem("token", response.data.auth_token);
  }
};

const removeToken = (response) => {
  localStorage.removeItem("token");
};

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const signIn = () => {
    return (dispatch) => {
      dispatch(signInRequest());
      axios
        .post("http://localhost:3001/authenticate", {
          email: email,
          password: password,
        })
        .then((response) => {
          dispatch(signInSuccess(response));
          setToken(response);
        })
        .catch((error) => {
          dispatch(signInFail(error));
          removeToken(error);
          setTimeout(() => {
            dispatch(resetAuth());
          }, 5000);
        });
    };
  };

  const registerAccount = () => {
    return (dispatch) => {
      dispatch(registerRequest());
      axios
        .post("http://localhost:3001/authenticate", {
          email: email,
          password: password,
          password: passwordConf,
        })
        .then((response) => {
          dispatch(registerSuccess());
        })
        .catch((error) => {
          dispatch(registerFail(error));
          setTimeout(() => {
            dispatch(resetAuth());
          }, 5000);
        });
    };
  };

  const changePassword = () => {
    return (dispatch) => {};
  };

  const signOut = () => {
    return (dispatch) => {
      dispatch(signOutSuccess());
    };
  };

  return {
    email,
    setEmail,
    oldPassword,
    setOldPassword,
    password,
    setPassword,
    passwordConf,
    setPasswordConf,
    signIn,
    signOut,
    registerAccount,
  };
};

export default useAuth;
