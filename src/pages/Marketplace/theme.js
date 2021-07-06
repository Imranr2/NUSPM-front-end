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
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 30,
    alignItems: "center",
    height: "100%",
    width: "10vw",
    minWidth: 110,
  },
  paper: {
    borderRadius: 4,
  },
  verticalSearch: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3vh",
  },
  search: {
    flexWrap: "nowrap",
    flexGrow: 1,
    justifyContent: "space-evenly",
    marginTop: "5vh",
  },
  fields: {
    borderRadius: 30,
    alignItems: "center",
    height: "100%",
    width: "22vw",
    minWidth: 200,
  },
  card: {
    height: 400,
  },
  alert: {
    marginTop: "1vh",
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
  notFound: {
    marginTop: "15vh",
    // marginTop: 200,
  },
}));

export { theme, useStyles };
