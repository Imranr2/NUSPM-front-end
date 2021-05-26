import "./App.css";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import pushtest from "./pages/Pushtest/pushtest";
import Home from "./pages/Home/Home";
import store from "./redux/store";

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/pushtest" component={pushtest}></Route>
            <Route exact path="/home" component={Home}></Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
