/* eslint-disable */
import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { connect } from "react-redux";
import Login from "../../pages/Login/Login";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function Landing({ awake }) {
  const { pingHeroku } = useAuth();
  useEffect(() => pingHeroku(), []);
  return <>{awake ? <Login /> : <LoadingSpinner />}</>;
}

const mapStateToProps = (state) => {
  return {
    awake: state.auth.pingHerokuSuccess,
  };
};

export default connect(mapStateToProps)(Landing);
