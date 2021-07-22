import React from "react";
import NavBar from "../../components/NavBar";
import { ThemeProvider, Container, Typography } from "@material-ui/core";
import { theme } from "../../Theme";
import { useStyles } from "./theme";
import Footer from "../../components/Footer/Footer";

export default function About() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters={true}
        maxWidth={false}
        className={classes.main}
      >
        <NavBar arr={[false, false, false]} />
        <Container
          disableGutters={true}
          className={classes.body}
          maxWidth={false}
        >
          <Typography variant="h4" color="primary" className={classes.title}>
            What is NUSPM?
          </Typography>
          <Typography variant="h6" align="left" className={classes.text}>
            NUSPM is a platform for NUS students to find better tutorial slots
            by initiating swaps with other students. Currently, students resort
            to asking around on many different platforms such as Reddit and
            Telegram groups in order to look for someone to swap tutorial slots
            with. With NUSPM, the process is centralised and the result is an
            easy and hassle-free experience
          </Typography>
          <Typography variant="h4" color="primary" className={classes.text}>
            Who are we?
          </Typography>
          <Typography variant="h6" align="left" className={classes.text}>
            We are Year 2 students from NUS, Liew Jian Hong and Muhammad Imran.
            We created this website as part of an Independent Software
            Development Project called Orbital.
          </Typography>
          <Typography variant="h4" color="primary" className={classes.text}>
            How does NUSPM work?
          </Typography>
          <Typography variant="h6" align="left" className={classes.text}>
            NUSPM currently uses the NUSMods API to get all the module
            information such as the module code and slot type (TUT/REC/LAB).
            NUSPM is built on a React front end which is hosted on Netlify and a
            Ruby on Rails backend which is hosted on Heroku.
          </Typography>
        </Container>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
