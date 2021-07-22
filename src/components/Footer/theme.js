import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingBottom: 20,
    paddingTop: 20,
    maxHeight: "10vh",
    borderColor: "#a6a6a6",
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: "#f5f5f5",
  },
  footerText: {
    wordWrap: "break-word",
  },
  link: {
    color: "#9b9b9b",
    "&:hover": {
      color: "#0D169F",
    },
    textDecoration: "none",
    margin: theme.spacing(0, 3),
  },
}));

export { useStyles };
