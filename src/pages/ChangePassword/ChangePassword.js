/* eslint-disable */
import NavBar from "../../components/NavBar";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import Footer from "../../components/Footer/Footer";
import {
  ThemeProvider,
  Container,
  Tabs,
  Tab,
  Paper,
  Drawer,
  List,
  ListItemIcon,
  Button,
} from "@material-ui/core";
import { theme } from "../../Theme";
import { useState } from "react";
import { useStyles } from "./theme";
import { useMediaQuery } from "react-responsive";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

function ChangePassword() {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const isSmallScreen = useMediaQuery({ query: "(max-width:900px)" });

  return (
    <ThemeProvider theme={theme}>
      <Container
        className={classes.main}
        disableGutters={true}
        maxWidth={false}
      >
        <NavBar arr={[false, false, true]} />
        {!isSmallScreen && (
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
        )}
        {isSmallScreen && (
          <Container
            className={classes.body}
            disableGutters={true}
            maxWidth={false}
          >
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              className={classes.smallTabs}
            >
              <Tab icon={<VpnKeyIcon />} />
            </Tabs>
            {value === 0 && <ChangePasswordForm />}
          </Container>
        )}

        <Footer arr={[false]} />
      </Container>
    </ThemeProvider>
  );
}

export default ChangePassword;
