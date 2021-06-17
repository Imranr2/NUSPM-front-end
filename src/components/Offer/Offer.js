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
import useOffer from "../../hooks/useOffer";

export default function Offer(props) {
  const classes = useStyles();
  const { updateOffer } = useOffer();
  const [offerOpen, setOfferOpen] = useState(false);
  const handleOfferOpen = () => setOfferOpen(true);
  const handleOfferClose = () => setOfferOpen(false);
  const [currentSwap, setCurrentSwap] = useState();
  const [incomingSwap, setIncomingSwap] = useState();
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/swaps/${props.card.creatorSwapId}`, {
        headers,
      })
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
    axios
      .get(`http://localhost:3001/api/v1/swaps/${props.card.initiatorSwapId}`, {
        headers,
      })
      .then((response) => {
        setIncomingSwap(response.data);
        console.log(incomingSwap);
        setLoading2(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleAccept() {
    updateOffer(props.card.id, true, false);
  }

  return (
    <Grid key={props} container item xs={12} sm={6} md={4} justify="center">
      <Card className={classes.card}>
        <ButtonBase onClick={handleOfferOpen}>
          {!loading2 && (
            <CardContent>
              <Typography variant="h6">
                {incomingSwap.module_code}
                <br />
                {incomingSwap.slot_type}
                <br />
                {incomingSwap.current_slot}
              </Typography>
            </CardContent>
          )}
          <Dialog
            classes={{ paper: classes.dialog }}
            open={offerOpen}
            onClose={handleOfferClose}
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
                      <br />
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAccept}>Accept</Button>
              <Button className={classes.button}>Reject</Button>
            </DialogActions>
          </Dialog>
        </ButtonBase>
      </Card>
    </Grid>
  );
}
