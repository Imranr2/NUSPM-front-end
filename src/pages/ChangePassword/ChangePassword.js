/* eslint-disable */
import NavBar from "../../components/NavBar";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import Footer from "../../components/Footer/Footer";
import { ThemeProvider, Container, Tabs, Tab, Paper } from "@material-ui/core";
import { theme } from "../../Theme";
import { useState } from "react";
import { useStyles } from "./theme";

function ChangePassword() {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container
        className={classes.main}
        disableGutters={true}
        maxWidth={false}
      >
        <NavBar arr={[false, false, true]} />
        <Container
          className={classes.body}
          disableGutters={true}
          maxWidth={false}
        >
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
        </Container>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default ChangePassword;
