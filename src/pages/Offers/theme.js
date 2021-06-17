import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "88vh",
    alignItems: "center",
  },
  tabs: {
    marginTop: "5vh",
  },
  // button: {
  //   borderRadius: 30,
  //   alignItems: "center",
  //   height: "100%",
  //   width: "10vw",
  // },
  // paper: {
  //   borderRadius: 4,
  // },
  // search: {
  //   flexWrap: "nowrap",
  //   flexGrow: 1,
  //   justifyContent: "space-evenly",
  //   marginTop: "5vh",
  // },
  // fields: {
  //   borderRadius: 30,
  //   alignItems: "center",
  //   height: "100%",
  //   width: "22vw",
  // },
  // card: {
  //   height: 400,
  // },
}));

export { useStyles };
