import "./App.css";
import { Provider, connect } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import CreateSwap from "./pages/CreateSwap/CreateSwap";
<<<<<<< Updated upstream
import Marketplace from "./pages/Marketplace/Marketplace";
=======
import ViewSwap from "./pages/View Swap/ViewSwap";
import YourSwap from "./pages/YourSwap/YourSwap";
>>>>>>> Stashed changes
import pushtest from "./pages/Pushtest/pushtest";
import Home from "./pages/Home/Home";
import GuardedRoute from "./components/GuardedRoute/GuardedRoute";

function App({ isAuthenticated }) {
  return (
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
              path="/yourSwap"
              component={YourSwap}
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
