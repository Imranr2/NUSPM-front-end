import { makeStyles, withStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  actionArea: {
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
    "&:focus": {
      borderColor: "#0D169F",
      backgroundColor: "#dedede",
    },
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "15vw",
    minWidth: 200,
  },
  typography: {
    // width: "15vw",
    minWidth: 200,
  },
  field: {
    marginBottom: 8,
  },
  comparison: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
export { useStyles };
