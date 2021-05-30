import "./App.css";
import React, { useEffect, useState } from "react";
import { Provider, connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import pushtest from "./pages/Pushtest/pushtest";
import Home from "./pages/Home/Home";
import store from "./redux/store";
import GuardedRoute from "./components/GuardedRoute/GuardedRoute";

function App({ isAuthenticated }) {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/pushtest" component={pushtest}></Route>
              <GuardedRoute
                exact
                path="/home"
                component={Home}
                auth={isAuthenticated}
              ></GuardedRoute>
            </Switch>
          </BrowserRouter>
        </header>
      </div>
    </Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);
