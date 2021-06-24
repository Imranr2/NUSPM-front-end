import PotentialSwap from "../PotentialSwap/PotentialSwap";
import { Grid, Container } from "@material-ui/core";
// import { useStyles } from "./theme";

function SwapList(props) {
  //   const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={4}>
        {props.creatorSwaps.map((swap, index) => (
          <PotentialSwap
            key={index}
            creatorSwap={swap}
            initiatorSwaps={props.initiatorSwaps}
            initiatorSlot={props.initiatorSlot}
            slotDets={props.slotDets}
          ></PotentialSwap>
        ))}
      </Grid>
    </Container>
  );
}

export default SwapList;
