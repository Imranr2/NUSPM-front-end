import { Button, withStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const SearchBox = styled(TextField)(() => ({
  root: {
    variant: "outlined",
    placeholder: "Email",
    type: "email",
    name: "email",
  },
  "& fieldset": {
    color: "black",
    borderRadius: 50,
    borderColor: "#0D169F",
    borderWidth: "2px",
  },
}));

const StyledButton = withStyles({
  root: {
    background: "white",
    color: "black",
    borderRadius: 50,
    borderColor: "#0D169F",
    borderWidth: "2px",
  },
})(Button);

const Style2Button = withStyles({
  root: {
    background: "red",
    color: "white",
  },
})(Button);

export { StyledButton, Style2Button, SearchBox };
