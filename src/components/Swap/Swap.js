/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Container,
  Typography,
  CardActions,
} from "@material-ui/core";
import { useStyles } from "./theme";
import CurrentSwapButtons from "../ButtonSets/CurrentSwapButtons";
import CompletedSwapButtons from "../ButtonSets/CompletedSwapButtons";
import InitiateButtons from "../ButtonSets/InitiateButtons";
import { connect } from "react-redux";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

function Swap({ key, card, buttonset, offer }) {
  const classes = useStyles();
  let buttons = null;
  const [newSlot, setNewSlot] = useState("");
  const [email, setEmail] = useState("");

  switch (buttonset) {
    case "currentSwap":
      buttons = <CurrentSwapButtons swapDetails={card} />;
      break;
    case "completedSwap":
      buttons = <CompletedSwapButtons swapDetails={card} offer={offer} />;
      break;
    default:
      buttons = <InitiateButtons swapDetails={card} />;
      break;
  }

  useEffect(() => {
    if (offer.length > 0) {
      if (offer[0].initiatorSwapId !== card.id) {
        setNewSlot(offer[0].initiatorSwap.current_slot);
      } else {
        setNewSlot(offer[0].creatorSwap.current_slot);
      }
    }
  }, []);

  useEffect(() => {
    if (offer.length > 0) {
      if (offer[0].initiatorSwapId !== card.id) {
        setEmail(offer[0].initiatorEmail);
      } else {
        setEmail(offer[0].creatorEmail);
      }
    }
  }, []);

  return (
    <>
      {buttonset === "currentSwap" && (
        <Grid key={key} container item xs={12} sm={6} md={4} justify="center">
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" component="div">
                {card.module_code}
                <br />
                {card.slot_type}
                <br />
                {card.day}
                <br />
                {`${card.startTime} - ${card.endTime}`}
                <br />
                {card.venue}
                <br />
                Have: [{card.current_slot}]
                <br />
                Want: [{card.desired_slots.sort().toString()}]
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

      {buttonset === "completedSwap" && (
        <Grid key={key} container item xs={12} sm={6} md={4} justify="center">
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6" component="div">
                {card.module_code}
                <br />
                {card.slot_type}
                <br />
                {card.day}
                <br />
                {`${card.startTime} - ${card.endTime}`}
                <br />
                {card.venue}
                <br />
                New: [{newSlot}]
                <br />
                Old: [{card.current_slot}]
                <br />
                {email}
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
