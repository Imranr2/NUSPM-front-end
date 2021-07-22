import { makeStyles } from "@material-ui/core";

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
    marginTop: "20vh",
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
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: {
    margin: theme.spacing(0, 3, 3, 3),
  },
  title: {
    margin: theme.spacing(3),
  },
}));

export { useStyles };
