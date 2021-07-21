import React from "react";
import { useState } from "react";
import {
  ButtonBase,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";
import { useStyles } from "./theme";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import CurrentOfferButtons from "../ButtonSets/CurrentOfferButtons";
import PendingOfferButtons from "../ButtonSets/PendingOfferButtons";
import { connect } from "react-redux";

function Offer({ key, card, tab, userId }) {
  const classes = useStyles();
  const [offerOpen, setOfferOpen] = useState(false);

  const handleOfferOpen = () => {
    setOfferOpen(true);
  };
  const handleOfferClose = () => {
    setOfferOpen(false);
  };

  let buttonset = null;

  switch (tab) {
    case "currentOffer":
      buttonset = (
        <CurrentOfferButtons
          offerDetails={card}
          initiatorSwap={card.initiatorSwap}
          creatorSwap={card.creatorSwap}
        />
      );
      break;
    case "pendingOffer":
      buttonset = <PendingOfferButtons offerDetails={card} />;
      break;
    default:
      break;
  }

  return (
    <Grid key={key} container item xs={12} sm={6} md={4} justify="center">
      <Card className={classes.card}>
        <ButtonBase onClick={handleOfferOpen}>
          {(tab === "currentOffer" || tab === "rejectedOffer") && (
            <CardContent>
              <Typography variant="h6" component={"div"}>
                {card.creatorSwap.module_code}
                <br />
                {card.creatorSwap.slot_type}
                <br />
                {card.creatorSwap.day}
                <br />
                {`${card.creatorSwap.startTime} - ${card.creatorSwap.endTime}`}
                <br />
                {card.creatorSwap.venue}
                <br />
                Current Slot: [
                {card.initiatorUserId === userId
                  ? card.initiatorSwap.current_slot
                  : card.creatorSwap.current_slot}
                ]{/* Current Slot: [{card.creatorSwap.current_slot}] */}
                <br />
                {tab === "rejectedOffer" && (
                  <Typography variant="h6" component={"div"}>
                    Rejected Slot: [
                    {card.initiatorUserId === userId
                      ? card.creatorSwap.current_slot
                      : card.initiatorSwap.current_slot}
                    ]
                  </Typography>
                )}
                {tab === "currentOffer" && (
                  <Typography variant="h6" component={"div"}>
                    Pending Slot: [
                    {card.initiatorUserId === userId
                      ? card.creatorSwap.current_slot
                      : card.initiatorSwap.current_slot}
                    ]
                  </Typography>
                )}
              </Typography>
            </CardContent>
          )}
          {tab === "pendingOffer" && (
            <CardContent>
              <Typography variant="h6" component={"div"}>
                {card.initiatorSwap.module_code}
                <br />
                {card.initiatorSwap.slot_type}
                <br />
                {card.initiatorSwap.day}
                <br />
                {`${card.initiatorSwap.startTime} - ${card.initiatorSwap.endTime}`}
                <br />
                {card.initiatorSwap.venue}
                <br />
                Current Slot: [{card.initiatorSwap.current_slot}]
                <br />
                Pending Slot: [{card.creatorSwap.current_slot}]
              </Typography>
            </CardContent>
          )}
        </ButtonBase>
        <Dialog
          open={offerOpen}
          onClose={handleOfferClose}
          onBackdropClick={handleOfferClose}
          aria-labelledby="offer-dialog-title"
        >
          {tab === "pendingOffer" && (
            <DialogTitle id="offer-dialog-title">Pending Offer</DialogTitle>
          )}
          {tab === "rejectedOffer" && (
            <DialogTitle id="offer-dialog-title">Rejected Offer</DialogTitle>
          )}
          {tab === "currentOffer" && (
            <DialogTitle id="offer-dialog-title">Confirm Offer</DialogTitle>
          )}
          <DialogContent>
            <Container className={classes.container}>
              <Container className={classes.cardLabel} disableGutters="true">
                <Card className={classes.card}>
                  {(tab === "pendingOffer" ||
                    (tab === "rejectedOffer" &&
                      card.initiatorUserId === userId)) && (
                    <Typography
                      className={classes.typography}
                      variant="h6"
                      component={"div"}
                      align="center"
                    >
                      {card.initiatorSwap.module_code}
                      <br />
                      {card.initiatorSwap.slot_type}
                      <br />
                      {card.initiatorSwap.day}
                      <br />
                      {`${card.initiatorSwap.startTime} - ${card.initiatorSwap.endTime}`}
                      <br />
                      {card.initiatorSwap.venue}
                      <br />
                      Have: [{card.initiatorSwap.current_slot}]
                      <br />
                      Want: [{card.initiatorSwap.desired_slots.toString()}]
                    </Typography>
                  )}

                  {(tab === "currentOffer" ||
                    (tab === "rejectedOffer" &&
                      card.creatorUserId === userId)) && (
                    <Typography
                      className={classes.typography}
                      variant="h6"
                      component={"div"}
                      align="center"
                    >
                      {card.creatorSwap.module_code}
                      <br />
                      {card.creatorSwap.slot_type}
                      <br />
                      {card.creatorSwap.day}
                      <br />
                      {`${card.creatorSwap.startTime} - ${card.creatorSwap.endTime}`}
                      <br />
                      {card.creatorSwap.venue}
                      <br />
                      Have: [{card.creatorSwap.current_slot}]
                      <br />
                      Want: [{card.creatorSwap.desired_slots.toString()}]
                    </Typography>
                  )}
                </Card>
                <Typography
                  className={classes.typography}
                  color="primary"
                  variant="h5"
                  align="center"
                >
                  Current Slot
                </Typography>
              </Container>
              <ArrowRightIcon></ArrowRightIcon>
              <ArrowRightIcon></ArrowRightIcon>
              <ArrowRightIcon></ArrowRightIcon>
              <Container className={classes.cardLabel} disableGutters="true">
                <Card className={classes.card}>
                  {(tab === "pendingOffer" ||
                    (tab === "rejectedOffer" &&
                      card.initiatorUserId === userId)) && (
                    <Typography
                      className={classes.typography}
                      variant="h6"
                      component={"div"}
                      align="center"
                    >
                      {card.creatorSwap.module_code}
                      <br />
                      {card.creatorSwap.slot_type}
                      <br />
                      {card.creatorSwap.day}
                      <br />
                      {`${card.creatorSwap.startTime} - ${card.creatorSwap.endTime}`}
                      <br />
                      {card.creatorSwap.venue}
                      <br />
                      Have: [{card.creatorSwap.current_slot}]
                      <br />
                      Want: [{card.creatorSwap.desired_slots.toString()}]
                    </Typography>
                  )}

                  {(tab === "currentOffer" ||
                    (tab === "rejectedOffer" &&
                      card.creatorUserId === userId)) && (
                    <Typography
                      className={classes.typography}
                      variant="h6"
                      component={"div"}
                      align="center"
                    >
                      {card.initiatorSwap.module_code}
                      <br />
                      {card.initiatorSwap.slot_type}
                      <br />
                      {card.initiatorSwap.day}
                      <br />
                      {`${card.initiatorSwap.startTime} - ${card.initiatorSwap.endTime}`}
                      <br />
                      {card.initiatorSwap.venue}
                      <br />
                      Have: [{card.initiatorSwap.current_slot}]
                      <br />
                      Want: [{card.initiatorSwap.desired_slots.toString()}]
                    </Typography>
                  )}
                </Card>
                {tab === "pendingOffer" && (
                  <Typography
                    className={classes.typography}
                    color="primary"
                    variant="h5"
                    align="center"
                  >
                    Pending Slot
                  </Typography>
                )}
                {tab === "rejectedOffer" && (
                  <Typography
                    className={classes.typography}
                    color="primary"
                    variant="h5"
                    align="center"
                  >
                    Rejected Slot
                  </Typography>
                )}
                {tab === "currentOffer" && (
                  <Typography
                    className={classes.typography}
                    color="primary"
                    variant="h5"
                    align="center"
                  >
                    New Slot
                  </Typography>
                )}
              </Container>
            </Container>
          </DialogContent>
          <DialogActions>{buttonset}</DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
  };
};

export default connect(mapStateToProps)(Offer);
