import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  ButtonBase,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Container,
} from "@material-ui/core";
import { useStyles } from "./theme";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import axios from "axios";
import authAxios from "../../helpers/authAxios";
import useOffer from "../../hooks/useOffer";
import CurrentOfferButtons from "../ButtonSets/CurrentOfferButtons";
import PendingOfferButtons from "../ButtonSets/PendingOfferButtons";

export default function Offer({ key, card, tab }) {
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
              <Typography variant="h6">
                {card.creatorSwap.module_code}
                <br />
                {card.creatorSwap.slot_type}
                <br />
                {card.creatorSwap.day}
                <br />
                {card.creatorSwap.venue}
                <br />
                {`${card.creatorSwap.startTime} - ${card.creatorSwap.endTime}`}
                <br />
                Current Slot: [{card.creatorSwap.current_slot}]
                <br />
                {tab === "rejectedOffer" && (
                  <Typography variant="h6">
                    Rejected Slot [{card.initiatorSwap.current_slot}]
                  </Typography>
                )}
                {tab === "currentOffer" && (
                  <Typography variant="h6">
                    Pending Slot [{card.initiatorSwap.current_slot}]
                  </Typography>
                )}
              </Typography>
            </CardContent>
          )}
          {tab === "pendingOffer" && (
            <CardContent>
              <Typography variant="h6">
                {card.initiatorSwap.module_code}
                <br />
                {card.initiatorSwap.slot_type}
                <br />
                {card.initiatorSwap.day}
                <br />
                {card.initiatorSwap.venue}
                <br />
                {`${card.initiatorSwap.startTime} - ${card.initiatorSwap.endTime}`}
                <br />
                Current Slot: [{card.creatorSwap.current_slot}]
                <br />
                Pending Slot: [{card.initiatorSwap.current_slot}]
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
          <DialogTitle id="offer-dialog-title">Confirm Offer</DialogTitle>
          <DialogContent>
            <Container className={classes.container}>
              <Container className={classes.cardLabel} disableGutters="true">
                <Card className={classes.card}>
                  <Typography
                    className={classes.typography}
                    variant="h6"
                    align="center"
                  >
                    {card.initiatorSwap.module_code}
                    <br />
                    {card.initiatorSwap.slot_type}
                    <br />
                    {card.initiatorSwap.current_slot}
                    <br />
                    {card.initiatorSwap.day}
                    <br />
                    {card.initiatorSwap.venue}
                    <br />
                    {`${card.initiatorSwap.startTime} - ${card.initiatorSwap.endTime}`}
                  </Typography>
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
                  <Typography
                    className={classes.typography}
                    variant="h6"
                    align="center"
                  >
                    {card.creatorSwap.module_code}
                    <br />
                    {card.creatorSwap.slot_type}
                    <br />
                    {card.creatorSwap.current_slot}
                    <br />
                    {card.creatorSwap.day}
                    <br />
                    {card.creatorSwap.venue}
                    <br />
                    {`${card.creatorSwap.startTime} - ${card.creatorSwap.endTime}`}
                  </Typography>
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
