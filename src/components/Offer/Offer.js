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
import CurrentButtons from "../ButtonSets/CurrentButtons";
import PendingButtons from "../ButtonSets/PendingButtons";

export default function Offer(props) {
  const classes = useStyles();
  const { updateOffer } = useOffer();
  const [offerOpen, setOfferOpen] = useState(false);
  const [currentSwap, setCurrentSwap] = useState();
  const [incomingSwap, setIncomingSwap] = useState();
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const handleOfferOpen = () => {
    setOfferOpen(true);
  };
  const handleOfferClose = () => {
    setOfferOpen(false);
  };

  // find way to extract out using useoffer
  useEffect(() => {
    authAxios
      .get(`/api/v1/swaps/${props.card.initiatorSwapId}`)
      .then((response) => {
        setCurrentSwap(response.data);
        console.log(currentSwap);
        setLoading1(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    authAxios
      .get(`/api/v1/swaps/${props.card.creatorSwapId}`)
      .then((response) => {
        setIncomingSwap(response.data);
        console.log(incomingSwap);
        setLoading2(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let buttonset = null;

  switch (props.tab) {
    case "current":
      buttonset = (
        <CurrentButtons
          offerDetails={props.card}
          status={props.status}
          initiatorSwap={currentSwap}
          creatorSwap={incomingSwap}
        />
      );
      break;
    case "pending":
      buttonset = (
        <PendingButtons offerDetails={props.card} status={props.status} />
      );
      break;
    default:
      break;
  }

  return (
    <Grid key={props} container item xs={12} sm={6} md={4} justify="center">
      <Card className={classes.card}>
        <ButtonBase onClick={handleOfferOpen}>
          {!loading1 &&
            !loading2 &&
            (props.tab === "current" || props.tab === "rejected") && (
              <CardContent>
                <Typography variant="h6">
                  {incomingSwap.module_code}
                  <br />
                  {incomingSwap.slot_type}
                  <br />
                  {incomingSwap.day}
                  <br />
                  {incomingSwap.venue}
                  <br />
                  {`${incomingSwap.startTime} - ${incomingSwap.endTime}`}
                  <br />
                  Current Slot: [{incomingSwap.current_slot}]
                  <br />
                  Pending Slot: [{currentSwap.current_slot}]
                </Typography>
              </CardContent>
            )}
          {!loading1 && !loading2 && props.tab === "pending" && (
            <CardContent>
              <Typography variant="h6">
                {currentSwap.module_code}
                <br />
                {currentSwap.slot_type}
                <br />
                {currentSwap.day}
                <br />
                {currentSwap.venue}
                <br />
                {`${currentSwap.startTime} - ${currentSwap.endTime}`}
                <br />
                Current Slot: [{incomingSwap.current_slot}]
                <br />
                Pending Slot: [{currentSwap.current_slot}]
              </Typography>
            </CardContent>
          )}
        </ButtonBase>
        <Dialog
          classes={{ paper: classes.dialog }}
          open={offerOpen}
          onClose={handleOfferClose}
          onBackdropClick={handleOfferClose}
          aria-labelledby="offer-dialog-title"
        >
          <DialogTitle id="offer-dialog-title">Confirm Offer</DialogTitle>
          <DialogContent classes={{ root: classes.dialogContent }}>
            <Container className={classes.container}>
              <Card>
                {!loading1 && (
                  <Typography
                    className={classes.typography}
                    variant="h6"
                    align="center"
                  >
                    {currentSwap.module_code}
                    <br />
                    {currentSwap.slot_type}
                    <br />
                    {currentSwap.current_slot}
                    <br />
                    {currentSwap.day}
                    <br />
                    {currentSwap.venue}
                    <br />
                    {`${currentSwap.startTime} - ${currentSwap.endTime}`}
                  </Typography>
                )}
              </Card>
              <ArrowRightIcon></ArrowRightIcon>
              <ArrowRightIcon></ArrowRightIcon>
              <ArrowRightIcon></ArrowRightIcon>
              <Card>
                {!loading2 && (
                  <Typography
                    className={classes.typography}
                    variant="h6"
                    align="center"
                  >
                    {incomingSwap.module_code}
                    <br />
                    {incomingSwap.slot_type}
                    <br />
                    {incomingSwap.current_slot}
                    <br />
                    {incomingSwap.day}
                    <br />
                    {incomingSwap.venue}
                    <br />
                    {`${incomingSwap.startTime} - ${incomingSwap.endTime}`}
                  </Typography>
                )}
              </Card>
            </Container>
            <Container className={classes.container}>
              <Typography
                className={classes.typography}
                color="primary"
                variant="h5"
                align="center"
              >
                Current Slot
              </Typography>
              <Typography
                className={classes.typography}
                color="primary"
                variant="h5"
                align="center"
              >
                Pending Slot
              </Typography>
            </Container>
          </DialogContent>
          <DialogActions>{buttonset}</DialogActions>
        </Dialog>
      </Card>
    </Grid>
  );
}
