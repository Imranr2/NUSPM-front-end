import {
  ThemeProvider,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Button,
} from "@material-ui/core";
import { theme } from "../../Theme";
import Logo from "../../components/Logo";
import { Link as RouterLink } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import useAuth from "../../hooks/useAuth";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { useStyles } from "./theme";
import { PulseLoader } from "react-spinners";

function Signup({ loading, registerError, errorMsg, success }) {
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

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <div>
          <Logo width="300" />
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
                  helperText="Please use your NUS email eXXXXXXX@u.nus.edu"
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
            <Button
              className={classes.button}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
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
          {loading && <PulseLoader color="#0D169F" />}
          {registerError && (
            <>
              {errorMsg.map((error) => (
                <Alert severity="error">{error}</Alert>
              ))}
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
    loading: state.auth.registerLoading,
    registerError: state.auth.registerError,
    errorMsg: state.auth.errorMsg,
    success: state.auth.registerSuccess,
  };
};

export default connect(mapStateToProps)(Signup);
