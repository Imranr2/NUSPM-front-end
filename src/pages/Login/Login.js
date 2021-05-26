import React, { useEffect, useState } from "react";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { theme } from "../../Theme";
import Logo from "../../components/Logo";
import axios from "axios";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";

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
    axios
      .post("http://localhost:3001/authenticate", {
        email: email,
        password: password,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response.data.error));
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

// const mapStateToProps = state => {
//   return {
//     error:
//   }
// }
export default Login;
