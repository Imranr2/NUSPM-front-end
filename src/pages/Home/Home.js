import React from "react";
import NavBar from "../../components/NavBar";
import { Container } from "@material-ui/core";
import { useStyles } from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "../../Theme";
import ReactPlayer from "react-player/youtube";
import "./Home.css";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters={true}
        className={classes.main}
        maxWidth={false}
      >
        <NavBar arr={[true, false, false]} />
        <div className="content">
          <div className="player-wrapper">
            <ReactPlayer
              url="https://youtu.be/zNGRK7WS0_g"
              className="react-player"
              playing={false}
              width="100%"
              height="100%"
              controls={false}
            />
          </div>
        </div>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
