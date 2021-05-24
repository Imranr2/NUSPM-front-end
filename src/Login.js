import React, { useEffect, useState } from "react";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
import {
  ThemeProvider,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { theme } from "./Theme";
import Logo from "./components/Logo";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  function handleErrors(response) {
    if (!response.ok) {
      return response.json().then((text) => {
        setErrors([...errors, Object.values(text.error).toString()]);
        throw new Error(text.error);
      });
    }
    return response.json();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/authenticate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(handleErrors)
      .then((data) => {
        localStorage.setItem("token", data.auth_token);
        setLoggedIn(true);
      })
      .catch((error) => console.log(errors));
    if (loggedIn) {
      history.push("/pushtest");
    }
  };

  const printErrors =
    errors.length > 0 ? (
      <div>
        <ul>
          {errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    ) : (
      <></>
    );

  // if (loggedIn) {
  //   return <Redirect to="/signup" />;
  // }

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
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Log In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
}
export default Login;
