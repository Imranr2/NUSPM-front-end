import { createMuiTheme, makeStyles } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0D169F",
    },
    secondary: {
      main: "#9b9b9b",
    },
  },
  //   spacing: 8,
  //   overrides: {
  //     MuiButton: {
  //       root: {
  //         // marginTop: "24px",
  //         // marginBottom: "16px",
  //         // variant: "outlined",
  //         // flexGrow: 1,
  //         // maxWidth: "150px",
  //         // colorDefault: "#ff003c",
  //         // fontSize: "20px",
  //       },
  //     },
  //     MuiAppBar: {
  //       colorDefault: "#ffffff",
  //       width: "100%",
  //     },
  //   },
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexGrow: 6,
  },
  button: {
    marginTop: "24px",
    marginBottom: "16px",
    variant: "outlined",
    flexGrow: 1,
    maxWidth: "150px",
    // borderRadius: 60,
    fontSize: "20px",
    "&:hover": {
      backgroundColor: "#e1e2fc",
      color: "#0D169F",
    },
  },
  menu: {
    "&:hover": {
      backgroundColor: "#e1e2fc",
      color: "#0D169F",
    },
  },
  appbar: {
    colorDefault: "#ffffff",
    width: "100%",
  },
}));

export { theme, useStyles };
