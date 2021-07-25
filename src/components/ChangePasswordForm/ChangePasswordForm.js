import { Container, Grid, Button, TextField } from "@material-ui/core";
import useAuth from "../../hooks/useAuth";
import { connect } from "react-redux";
import { useStyles } from "./theme";
import { PulseLoader } from "react-spinners";
import Alert from "@material-ui/lab/Alert";

function ChangePasswordForm({ loading, user, success, error, errorMsg }) {
  const {
    oldPassword,
    setOldPassword,
    password,
    setPassword,
    passwordConf,
    setPasswordConf,
    changePassword,
  } = useAuth();

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    setOldPassword("");
    setPassword("");
    setPasswordConf("");
    changePassword(user.id, user.email, oldPassword, password, passwordConf);
  };
  return (
    <Container className={classes.main} disableGutters={true} maxWidth={false}>
      <div>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={oldPassword}
                variant="outlined"
                required
                name="currentPassword"
                label="Current Password"
                type="password"
                id="currentPassword"
                className={classes.text}
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                variant="outlined"
                required
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                className={classes.text}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={passwordConf}
                variant="outlined"
                required
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                className={classes.text}
                onChange={(event) => setPasswordConf(event.target.value)}
              />
            </Grid>
          </Grid>
          {loading && (
            <Container>
              <PulseLoader color="#0D169F" />
            </Container>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Change Password
          </Button>
          {error && (
            <Container className={classes.container} disableGutters={true}>
              <Alert severity="error">{errorMsg}</Alert>
            </Container>
          )}
          {success && (
            <Container className={classes.container} disableGutters={true}>
              <Alert severity="success">Password updated successfully</Alert>
            </Container>
          )}
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.updateLoading,
    user: state.auth.user,
    success: state.auth.updateSuccess,
    error: state.auth.updateError,
    errorMsg: state.auth.errorMsg,
  };
};

export default connect(mapStateToProps)(ChangePasswordForm);
