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
  shape: {
    borderRadius: 30,
  },
});

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    disableGutters: true,
    width: "100vw",
    height: "100vh",
  },
  button: {
    borderRadius: 30,
    alignItems: "center",
    height: "100%",
    width: "10vw",
  },
  paper: {
    borderRadius: 4,
  },
  search: {
    flexWrap: "nowrap",
    flexGrow: 1,
    justifyContent: "space-evenly",
    marginTop: "15vh",
  },
  fields: {
    borderRadius: 30,
    alignItems: "center",
    height: "100%",
    width: "22vw",
  },
  card: {
    height: 400,
  },
}));

export { theme, useStyles };