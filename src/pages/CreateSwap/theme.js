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
  button: {
    borderRadius: 30,
    marginTop: 24,
    marginBottom: 16,
  },
  paper: {
    borderRadius: 4,
  },
  form: {
    marginTop: "20vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    // width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 0,
  },
}));

export { theme, useStyles };
