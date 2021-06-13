import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "15vw",
    minWidth: 300,
    minHeight: 300,
  },
  dialog: {
    minWidth: "70vw",
    minHeight: "70vh",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    margin: 16,
  },
}));

export { useStyles };
