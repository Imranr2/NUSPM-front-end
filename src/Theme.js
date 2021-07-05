import { makeStyles, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0D169F",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 30,
  },
  overrides: {
    MuiButton: {
      root: {
        variant: "outlined",
        borderRadius: 50,
        textTransform: "none",
      },
    },
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

export { theme };
