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
    borderRadius: 4,
    fontSize: "20px",
    "&:hover": {
      backgroundColor: "#e1e2fc",
      color: "#0D169F",
    },
  },
  buttonStandard: {
    variant: "outlined",
    flexGrow: 1,
    maxWidth: "150px",
    borderRadius: 4,
    fontSize: "20px",
    "&:hover": {
      backgroundColor: "#",
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
    width: "100vw",
    display: "flex",
    flexWrap: "wrap",
  },
  appbarSmall: {
    width: "100vw",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    boxShadow: "0px 5px 10px 1px #d9d9d9",
  },
}));

export { theme, useStyles };
