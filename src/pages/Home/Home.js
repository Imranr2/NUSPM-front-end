import React from "react";
import NavBar from "../../components/NavBar";
import { Container } from "@material-ui/core";
import { useStyles } from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "../../Theme";
export default function Home() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.main} maxWidth={false}>
        <NavBar arr={[true, false, false]} />
      </Container>
    </ThemeProvider>
  );
  //call API to move moduleList to global state
}
