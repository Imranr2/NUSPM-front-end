import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "15vw",
    minWidth: 150,
  },
  button: {
    justifyContent: "center",
  },
}));

export { useStyles };
