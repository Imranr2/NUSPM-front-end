import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // width: "15vw",
    minWidth: 250,
  },
  button: {
    justifyContent: "center",
  },
  tag: {
    display: "flex",
    flexDirection: "column",
  },
  innerTag: {
    display: "flex",
    justifyContent: "center",
  },
}));

export { useStyles };
