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
    marginTop: "5vh",
    borderRadius: 0,
    width: "70vw",
    height: "70vh",
    maxWidth: "40vw",
    minWidth: 450,
    justifyContent: "flex-start",
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    height: "70vh",
    width: "30vw",
    minWidth: 150,
    maxWidth: "10vw",
  },
  main: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 0,
  },
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export { theme, useStyles };
