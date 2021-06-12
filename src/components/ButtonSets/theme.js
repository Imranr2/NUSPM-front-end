import {
  withStyles,
  makeStyles,
  createMuiTheme,
  Button,
} from "@material-ui/core";

const DeleteButton = withStyles({
  root: {
    backgroundColor: "#ff0000",
    color: "#fff",
  },
})(Button);

export { DeleteButton };
