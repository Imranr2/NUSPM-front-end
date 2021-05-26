import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { theme } from "../../Theme";
import Logo from "../../components/Logo";
import { useHistory, Link as RouterLink } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import useAuth from "../../hooks/useAuth";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";

function Signup({ loading, error, errorMsg, success }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    passwordConf,
    setPasswordConf,
    registerAccount,
  } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerAccount(email, password, passwordConf);
  };

  function Print() {}

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Logo></Logo>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  id="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Confirm"
                  type="password"
                  id="passwordConf"
                  onChange={(event) => setPasswordConf(event.target.value)}
                />
              </Grid>
            </Grid>

            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </form>
          {/*
            errorMsg type in authreducer.js is currently set to an empty string. I tried with array but still cannot work. Maybe you can test it out.
            The hello gets rendered so I know that it enters the block. I have also checked that the errorMsg is of type array (see useAuth.js under registerAccount catch block). Sign up with invalid accound and open console to see result
           */}
          {error && (
            <>
              <h1>Hello</h1>
              <ul>
                {errorMsg.map((e, index) => {
                  <li key={index}>{e}</li>;
                })}
              </ul>
            </>
          )}
          {success && (
            <>
              <Alert severity="success">
                Account created! You will be redirected to the login page
              </Alert>
            </>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.isLoading,
    error: state.auth.error,
    errorMsg: state.auth.errorMsg,
    success: state.auth.success,
  };
};

export default connect(mapStateToProps)(Signup);
