import {
  withStyles,
  makeStyles,
  createMuiTheme,
  Button,
} from "@material-ui/core";

const DeleteButton = withStyles({
  root: {
    // backgroundColor: "#ff0000",
    color: "#ff0000",
    borderColor: "#ff0000",
  },
})(Button);

export { DeleteButton };
