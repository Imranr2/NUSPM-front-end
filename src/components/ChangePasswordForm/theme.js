import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    // marginTop: "3vh",
  },
  text: {
    width: "18vw",
    minWidth: 250,
  },
  button: {
    marginTop: 24,
    marginBottom: 24,
    width: "18vw",
    minWidth: 250,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  alert: {
    width: "18vw",
    minWidth: 250,
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
}));

export { useStyles };
