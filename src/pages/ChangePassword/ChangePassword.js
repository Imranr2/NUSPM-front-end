/* eslint-disable */
import NavBar from "../../components/NavBar";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import { ThemeProvider, Tabs, Tab, Paper } from "@material-ui/core";
import { theme } from "../../Theme";
import { useState } from "react";
import { useStyles } from "./theme";

function ChangePassword() {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <NavBar arr={[false, false, true]} />
      <Paper elevation={6} className={classes.paper}>
        <Tabs
          orientation="vertical"
          value={value}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
        >
          <Tab label="Change Password" />
        </Tabs>
        {value === 0 && <ChangePasswordForm />}
      </Paper>
    </ThemeProvider>
  );
}

export default ChangePassword;
