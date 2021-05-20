import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function App(props) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [user, setUser] = useState({});

  // const handleLogin = (data) => {
  //   setIsLoggedIn(true);
  //   setUser(data.user);
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setUser({});
  // };

  const loginStatus = async () => {
    const res = await fetch("http://localhost:3001/authenticate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: {
        email: "test123@gmail.com",
        password: "test1234",
      },
    });
    console.log(2);
    const data = await console.log(res.json());
    const text = await console.log(data);
  };

  useEffect(() => loginStatus, []);
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
