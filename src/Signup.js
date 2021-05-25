import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Button,
} from "@material-ui/core";
import { theme } from "./Theme";
import Logo from "./components/Logo";
import { useHistory, Link as RouterLink } from "react-router-dom";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errors, setErrors] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const handleErrors = (response) => {
    if (response.status === 422) {
      return response.json().then((data) => {
        setErrors([...errors, ...data]);
        throw new Error(data);
      });
    }
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: passwordConf,
      }),
    })
      .then(handleErrors)
      .then((data) => {
        setLoggedIn(true);
      })
      .catch((error) => console.log(error));
    console.log("submitted");
    if (loggedIn) {
      history.push("/pushtest");
    }
  };

  const printErrors =
    errors.length > 0 ? (
      <div>
        <ul>
          {errors.map((error, index) => {
            return <li key={index}>{error}</li>;
          })}
        </ul>
      </div>
    ) : (
      <></>
    );

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
              <Grid item xs={12}>
                <TextField
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
        </div>
      </Container>
    </ThemeProvider>
  );
}
export default Signup;
