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
  inputs: {
    width: 396,
  },
  button: {
    borderRadius: 30,
  },
}));

export { theme, useStyles };
