import PotentialSwap from "../PotentialSwap/PotentialSwap";
import { Grid, Container } from "@material-ui/core";

function PotentialSwaps(props) {
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

export default PotentialSwaps;
