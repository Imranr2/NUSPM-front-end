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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { HistoryOutlined } from "@material-ui/icons";

const setToken = (response) => {
  if (response.status === 200) {
    localStorage.setItem("token", response.data.auth_token);
  }
};

const removeToken = (response) => {
  localStorage.removeItem("token");
};

const useAuth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const signIn = (email, password) => {
    dispatch(signInRequest());
    axios
      .post("http://localhost:3001/authenticate", {
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch(signInSuccess(response));
        setToken(response);
        history.push("/home");
      })
      .catch((error) => {
        console.log(error.response.data);
        dispatch(signInFail(error));
        removeToken(error);
        setTimeout(() => {
          dispatch(resetAuth());
        }, 5000);
      });
  };

  const registerAccount = (email, password, passwordConf) => {
    if (password === passwordConf) {
      dispatch(registerRequest());
      axios
        .post("http://localhost:3001/users", {
          email: email,
          password: password,
          passwordConf: passwordConf,
        })
        .then((response) => {
          dispatch(registerSuccess());
          setTimeout(() => {
            history.push("/");
          }, 3000);
          setTimeout(() => {
            dispatch(resetAuth());
          }, 4000);
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(Array.isArray(error.response.data));
          dispatch(registerFail(error.response.data));
          setTimeout(() => {
            dispatch(resetAuth());
          }, 5000);
        });
    } else {
      dispatch(
        registerFail([
          "Password and the confirmation do not match. Please check again.",
        ])
      );
      setTimeout(() => {
        dispatch(resetAuth());
      }, 5000);
    }
  };

  const signOut = () => {
    dispatch(signOutSuccess());
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
