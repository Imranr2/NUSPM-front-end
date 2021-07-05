import React from "react";
import { useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Container,
  Typography,
  CardActions,
} from "@material-ui/core";
import { useStyles } from "./theme";
import useAuth from "../../hooks/useAuth";
import useSwap from "../../hooks/useSwap";
import CurrentSwapButtons from "../ButtonSets/CurrentSwapButtons";
import CompletedSwapButtons from "../ButtonSets/CompletedSwapButtons";
import InitiateButtons from "../ButtonSets/InitiateButtons";
import { connect } from "react-redux";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

function Swap({ key, card, buttonset, offer, userSuccess, swapSuccess }) {
  const classes = useStyles();
  let buttons = null;
  const { completedSwap, showSwap } = useSwap();
  const { user, getUser } = useAuth();

  switch (buttonset) {
    case "currentSwap":
      buttons = <CurrentSwapButtons swapDetails={card} />;
      break;
    case "completedSwap":
      buttons = <CompletedSwapButtons swapDetails={card} />;
      break;
    default:
      buttons = <InitiateButtons swapDetails={card} />;
      break;
  }

  useEffect(() => {
    if (offer.length > 0) {
      if (offer[0].initiatorSwapId !== card.id) {
        showSwap(offer[0].initiatorSwapId);
      } else {
        showSwap(offer[0].creatorSwapId);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(completedSwap).length !== 0) {
      console.log(completedSwap);
      getUser(completedSwap.user_id);
    }
  }, [completedSwap]);

  return (
    <>
      {buttonset === "currentSwap" && (
        <Grid key={key} container item xs={12} sm={6} md={4} justify="center">
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6">
                {card.module_code}
                <br />
                {card.slot_type}
                <br />
                {card.day}
                <br />
                {card.venue}
                <br />
                {`${card.startTime} - ${card.endTime}`}
                <br />
                Have: [{card.current_slot}]
                <br />
                Want: [{card.desired_slots.toString()}]
              </Typography>
              <Container className={classes.tag}>
                {offer
                  .map((offer) => offer.creatorSwapId)
                  .includes(card.id) && (
                  <Container className={classes.innerTag}>
                    <LocalOfferIcon color="primary" />
                    <Typography variant="subtitle2">Current Offer</Typography>
                  </Container>
                )}
                {offer
                  .map((offer) => offer.initiatorSwapId)
                  .includes(card.id) && (
                  <Container className={classes.innerTag}>
                    <LocalOfferIcon color="disabled" />
                    <Typography variant="subtitle2">Pending Offer</Typography>
                  </Container>
                )}
              </Container>
            </CardContent>
            <CardActions className={classes.button}>{buttons}</CardActions>
          </Card>
        </Grid>
      )}

      {buttonset === "completedSwap" &&
        Object.keys(user).length !== 0 &&
        Object.keys(completedSwap).length !== 0 && (
          <Grid key={key} container item xs={12} sm={6} md={4} justify="center">
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h6">
                  {card.module_code}
                  <br />
                  {card.slot_type}
                  <br />
                  {card.day}
                  <br />
                  {card.venue}
                  <br />
                  {`${card.startTime} - ${card.endTime}`}
                  <br />
                  New: [{completedSwap.current_slot}]
                  <br />
                  Old: [{card.current_slot}]
                  <br />
                  {user.email}
                </Typography>
              </CardContent>
              <CardActions className={classes.button}>{buttons}</CardActions>
            </Card>
          </Grid>
        )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userSuccess: state.auth.fetchSuccess,
    swapSuccess: state.swap.showSuccess,
  };
};

export default connect(mapStateToProps)(Swap);
