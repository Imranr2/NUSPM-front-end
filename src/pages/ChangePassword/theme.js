import { makeStyles, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0D169F",
    },
    secondary: {
      main: "#9b9b9b",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 0,
    width: "70vw",
    height: "80vh",
    maxWidth: "40vw",

    justifyContent: "flex-start",
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    height: "80vh",
    width: "30vw",
    minWidth: "10vw",
    maxWidth: "10vw",
  },
}));

export { theme, useStyles };
