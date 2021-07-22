import { Container, Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { theme, useStyles } from "./theme";
import GitHubIcon from "@material-ui/icons/GitHub";

export default function Footer() {
  const classes = useStyles();
  return (
    <Container
      component="footer"
      disableGutters={true}
      maxWidth={false}
      className={classes.footer}
    >
      <Typography className={classes.footerText}>
        <Link
          underline="none"
          className={classes.link}
          component={RouterLink}
          to="/about"
        >
          About
        </Link>
        <RouterLink
          className={classes.link}
          to={{
            pathname: "https://github.com/Imranr2/NUSPM",
          }}
          target="_blank"
        >
          GitHub
        </RouterLink>
      </Typography>
    </Container>
  );
}
