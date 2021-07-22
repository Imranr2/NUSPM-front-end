import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    // marginTop: "20vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    // alignItems: "center",
    marginLeft: 0,
  },
  reactPlayer: {
    // paddingTop: "56.25%",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  footer: {
    margin: "auto",
  },
}));

export { useStyles };
// .player-wrapper {
//   width: auto; // Reset width
//   height: auto; // Reset height
// }
// .react-player {
//   padding-top: 56.25%; // Percentage ratio for 16:9
//   position: relative; // Set to relative
// }

// .react-player > div {
//   position: absolute; // Scaling will occur since parent is relative now
// }
