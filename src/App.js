import "./App.css";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import pushtest from "./pushtest";
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
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
