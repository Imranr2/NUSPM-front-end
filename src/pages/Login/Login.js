import { Link as RouterLink } from "react-router-dom";
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
import { useStyles } from "./theme";
import Logo from "../../components/Logo";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";
import Alert from "@material-ui/lab/Alert";

function Login({ loading, loginError, errorMsg }) {
  const { email, setEmail, password, setPassword, signIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div>
          <Logo width="300"></Logo>
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
            <Button
              className={classes.button}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Log In
            </Button>
            {loading && <PulseLoader color="#0D169F" />}
            {loginError && <Alert severity="error">Invalid Credentials!</Alert>}
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

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loginLoading,
    loginError: state.auth.loginError,
    errorMsg: state.auth.errorMsg,
  };
};
export default connect(mapStateToProps)(Login);
