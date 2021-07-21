import { createMuiTheme } from "@material-ui/core";

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
  },
});

export { theme };
