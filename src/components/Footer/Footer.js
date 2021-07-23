import { ThemeProvider, Container, Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { theme, useStyles } from "./theme";
import { useState } from "react";

export default function Footer({ arr }) {
  const classes = useStyles();
  const [aboutClicked, setAboutClicked] = useState(arr[0]);
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="footer"
        disableGutters={true}
        maxWidth={false}
        className={classes.footer}
      >
        <Typography
          className={classes.footerText}
          color={aboutClicked ? "primary" : "secondary"}
        >
          <Link
            underline="none"
            className={classes.link}
            component={RouterLink}
            to="/about"
            color={aboutClicked ? "primary" : "secondary"}
          >
            About
          </Link>
          <RouterLink
            className={classes.github}
            to={{
              pathname: "https://github.com/Imranr2/NUSPM",
            }}
            target="_blank"
          >
            GitHub
          </RouterLink>
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
