import Offer from "../Offer/Offer";
import { Grid, Container } from "@material-ui/core";
import { useStyles } from "./theme";

function OfferList(props) {
  const classes = useStyles();
  return (
    <Container>
      <Grid className={classes.list} container spacing={4}>
        {props.arr.map((offerDetails, index) => (
          <Offer key={index} card={offerDetails} tab={props.tab}></Offer>
        ))}
      </Grid>
    </Container>
  );
}

export default OfferList;
