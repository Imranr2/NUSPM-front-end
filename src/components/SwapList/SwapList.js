import Swap from "../Swap/Swap";
import { Grid, Container } from "@material-ui/core";
import { useStyles } from "./theme";

function SwapList(props) {
  const classes = useStyles();
  return (
    <Container>
      <Grid className={classes.list} container spacing={4}>
        {props.arr.map((card, index) => (
          <Swap key={index} card={card} buttonset={props.panel}></Swap>
        ))}
      </Grid>
    </Container>
  );
}

export default SwapList;
