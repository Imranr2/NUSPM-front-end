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

export default function Swap(props) {
  const classes = useStyles();
  const [offerOpen, setOfferOpen] = useState(false);
  const handleOfferOpen = () => setOfferOpen(true);
  const handleOfferClose = () => setOfferOpen(false);
  return (
    <Grid key={props} container item xs={12} sm={6} md={4} justify="center">
      <Card className={classes.card}>
        <ButtonBase onClick={handleOfferOpen}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6">Offer Test</Typography>
          </CardContent>
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
                  <CardContent>Current Slot Details</CardContent>
                  <br></br>
                  <br></br>
                  <br></br>
                </Card>
                <ArrowRightIcon></ArrowRightIcon>
                <ArrowRightIcon></ArrowRightIcon>
                <ArrowRightIcon></ArrowRightIcon>
                <Card>
                  <CardContent>New Slot Details</CardContent>
                  <br></br>
                  <br></br>
                  <br></br>
                </Card>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button>Accept</Button>
              <Button className={classes.button}>Reject</Button>
            </DialogActions>
          </Dialog>
        </ButtonBase>
      </Card>
    </Grid>
  );
}
