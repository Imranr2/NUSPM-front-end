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
  tabs: {
    // height: "80vh",
    // width: "30vw",
    // minWidth: "10vw",
    // maxWidth: "10vw",
  },
}));

export { theme, useStyles };
