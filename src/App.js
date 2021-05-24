import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import pushtest from "./pushtest";

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
    const data = await console.log(res.json());
    const text = await console.log(data);
  };

  useEffect(() => loginStatus, []);
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/pushtest" component={pushtest}></Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
