import { useState } from "react";
import {
  signInRequest,
  signInSuccess,
  signInFail,
  signOutSuccess,
  registerRequest,
  registerSuccess,
  registerFail,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFail,
  resetAuth,
} from "../redux/actions/authActions";
import authAxios from "../helpers/authAxios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
  const [user, setUser] = useState({});

  const signIn = (email, password) => {
    dispatch(signInRequest());
    authAxios
      .post("/authenticate", {
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch(signInSuccess(response.data));
        setToken(response);
        history.push("/home");
      })
      .catch((error) => {
        dispatch(signInFail(error));
        removeToken(error);
        setTimeout(() => {
          dispatch(resetAuth());
        }, 3000);
      });
  };

  const registerAccount = (email, password, passwordConf) => {
    dispatch(registerRequest());
    authAxios
      .post("/users", {
        email: email,
        password: password,
        password_confirmation: passwordConf,
      })
      .then((response) => {
        dispatch(registerSuccess());
        setTimeout(() => {
          history.push("/");
        }, 2000);
        setTimeout(() => {
          dispatch(resetAuth());
        }, 2000);
      })
      .catch((error) => {
        dispatch(registerFail(error.response.data));
        setTimeout(() => {
          dispatch(resetAuth());
        }, 2000);
      });
  };

  const signOut = () => {
    dispatch(signOutSuccess());
    localStorage.clear();
  };

  const changePassword = (id, email, oldPassword, password, passwordConf) => {
    dispatch(changePasswordRequest());
    authAxios
      .post("/authenticate", {
        email: email,
        password: oldPassword,
      })
      .then(() => {
        authAxios
          .put(`/users/${id}`, {
            password: password,
            password_confirmation: passwordConf,
          })
          .then((response) => {
            console.log(response.data);
            dispatch(changePasswordSuccess());
          })
          .catch((error) => {
            dispatch(changePasswordFail(error.response.data));
            console.log(error);
            setTimeout(() => {
              dispatch(resetAuth());
            }, 2000);
          });
      })
      .catch((error) => {
        dispatch(changePasswordFail(error.response.data));
        console.log(error);
        console.log(error.response.data.error);
        setTimeout(() => {
          dispatch(resetAuth());
        }, 2000);
      });
  };

  //add redux later
  const getUser = (id) => {
    authAxios
      .get(`/users/${id}`)
      .then((response) => {
        console.log("hello");
        setUser(response.data);
      })
      .catch((error) => console.log(error));
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
    user,
    setUser,
    signIn,
    signOut,
    registerAccount,
    changePassword,
    getUser,
  };
};

export default useAuth;
