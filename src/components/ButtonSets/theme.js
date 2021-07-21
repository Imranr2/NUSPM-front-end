import { withStyles, makeStyles, Button } from "@material-ui/core";

const DeleteButton = withStyles({
  root: {
    color: "#ff0000",
    borderColor: "#ff0000",
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  loader: {
    display: "flex",
    justifyContent: "center",
  },
}));

export { useStyles, DeleteButton };
