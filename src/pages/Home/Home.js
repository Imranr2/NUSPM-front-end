import React from "react";
import NavBar from "../../components/NavBar";
import { Container, Grid } from "@material-ui/core";
import { useStyles } from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "../../Theme";
import ReactPlayer from "react-player/youtube";
export default function Home() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <NavBar arr={[true, false, false]} />
      <Container className={classes.main} maxWidth={false}>
        <ReactPlayer url="https://youtu.be/iDnB0zWXZp4" />
      </Container>
    </ThemeProvider>
  );
  //call API to move moduleList to global state
}
