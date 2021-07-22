import "./App.css";
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import CreateSwap from "./pages/CreateSwap/CreateSwap";
import Marketplace from "./pages/Marketplace/Marketplace";
import Home from "./pages/Home/Home";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import GuardedRoute from "./helpers/GuardedRoute";
import YourSwap from "./pages/YourSwap/YourSwap";
import Landing from "./pages/Landing/Landing";
import About from "./pages/About/About";

function App({ isAuthenticated }) {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/signup" component={Signup} />
            <GuardedRoute
              exact
              path="/home"
              component={Home}
              auth={isAuthenticated}
            ></GuardedRoute>
            <GuardedRoute
              exact
              path="/marketplace"
              component={Marketplace}
              auth={isAuthenticated}
            ></GuardedRoute>
            <GuardedRoute
              exact
              path="/create"
              component={CreateSwap}
              auth={isAuthenticated}
            ></GuardedRoute>
            <GuardedRoute
              exact
              path="/myAccount"
              component={ChangePassword}
              auth={isAuthenticated}
            ></GuardedRoute>
            <GuardedRoute
              exact
              path="/yourSwap"
              component={YourSwap}
              auth={isAuthenticated}
            ></GuardedRoute>
            <GuardedRoute
              exact
              path="/about"
              component={About}
              auth={isAuthenticated}
            ></GuardedRoute>
            <GuardedRoute
              exact
              path="/changePassword"
              component={ChangePassword}
              auth={isAuthenticated}
            ></GuardedRoute>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);
