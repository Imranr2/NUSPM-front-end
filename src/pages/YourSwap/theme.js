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
  overrides: {
    MuiSvgIcon: {
      colorAction: {
        color: "#039e25",
      },
      colorDisabled: {
        color: "#666666",
      },
      colorError: {
        color: "#ff0000",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginTop: "5vh",
    width: "100vw",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 0,
  },
  alert: {
    marginTop: "1vh",
    borderRadius: 30,
  },
}));

export { theme, useStyles };
