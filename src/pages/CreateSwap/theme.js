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
    marginTop: "15vh",
  },
}));

export { theme, useStyles };
