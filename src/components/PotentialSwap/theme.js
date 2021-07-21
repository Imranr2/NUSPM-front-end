import { makeStyles } from "@material-ui/core";

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
    minWidth: 200,
  },
  typography: {
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
  loader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  standardButton: {
    color: "#0D169F",
  },
  cancelButton: {
    color: "#f00",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cardLabel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: 200,
  },
}));
export { useStyles };
