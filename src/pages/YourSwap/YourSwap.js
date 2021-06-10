import NavBar from "../../components/NavBar";
import ChangePasswordForm from "../../components/ChangePasswordForm/ChangePasswordForm";
import {
  ThemeProvider,
  Container,
  Grid,
  Button,
  TextField,
  Link,
  Tabs,
  Tab,
  Typography,
  Box,
  Paper,
} from "@material-ui/core";
import { theme } from "../../Theme";
import { useState, useEffect } from "react";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import SwapList from "../../components/SwapList/SwapList";

function YourSwap() {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const { userSwap, viewSwap } = useSwap();

  useEffect(() => viewSwap(), []);

  return (
    <ThemeProvider theme={theme}>
      <NavBar arr={[false, false, true]} />
      <Container className={classes.main}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
          onChange={handleChange}
        >
          <Tab label="Open" />
          <Tab label="Reserved" />
          <Tab label="Completed" />
        </Tabs>
        {value === 0 && (
          <SwapList
            arr={userSwap.filter(
              (swap) => !swap.isReserved && !swap.isCompleted
            )}
            panel="open"
          />
        )}
        {value === 1 && (
          <SwapList arr={userSwap.filter((swap) => swap.isReserved)} panel="reserved" />
        )}
        {value === 2 && (
          <SwapList arr={userSwap.filter((swap) => swap.isCompleted)} panel="completed" />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default YourSwap;
