import Swap from "../Swap/Swap";
import { Grid } from "@material-ui/core";
import { useStyles } from "./theme";

function SwapList(props) {
  const classes = useStyles();
  return (
    <Grid className={classes.list} container spacing={4}>
      {props.arr.map((card) => (
        <Swap key={card} {...card}></Swap>
      ))}
    </Grid>
  );
}

export default SwapList;
