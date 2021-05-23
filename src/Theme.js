import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0D169F",
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 30,
  },
  overrides: {
    MuiButton: {
      root: {
        marginTop: "24px",
        marginBottom: "16px",
        variant: "outlined",
      },
    },
  },
});

export { theme };
