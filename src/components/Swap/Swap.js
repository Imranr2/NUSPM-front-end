import React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import OpenButtons from "../ButtonSets/OpenButtons";
import ReservedButtons from "../ButtonSets/ReservedButtons";
import CompletedButtons from "../ButtonSets/CompletedButtons";
import InitiateButtons from "../ButtonSets/InitiateButtons";
import { PinDropSharp } from "@material-ui/icons";

export default function Swap(props) {
  const classes = useStyles();
  let buttonset = null;
  const { completedSwap, showSwap } = useSwap();

  switch (props.buttonset) {
    case "open":
      buttonset = (
        <OpenButtons swapDetails={props.card} status={props.status} />
      );
      break;
    case "reserved":
      buttonset = (
        <ReservedButtons swapDetails={props.card} status={props.status} />
      );
      break;
    case "completed":
      buttonset = (
        <CompletedButtons swapDetails={props.card} status={props.status} />
      );
      break;
    default:
      buttonset = (
        <InitiateButtons swapDetails={props.card} status={props.status} />
      );
      break;
  }

  useEffect(() => {
    if (props.offer.length > 0) {
      if (props.offer.initiatorSwapId === props.card.id) {
        showSwap(props.offer.initiatorSwapId);
      } else {
        showSwap(props.offer.creatorSwapId);
      }
    }
  }, []);

  return (
    <Grid key={props} container item xs={12} sm={6} md={4} justify="center">
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          {props.buttonset === "open" && (
            <Typography variant="h6">
              {props.card.module_code}
              <br />
              {props.card.slot_type}
              <br />
              {props.card.day}
              <br />
              {props.card.venue}
              <br />
              {`${props.card.startTime} - ${props.card.endTime}`}
              <br />
              Have: [{props.card.current_slot}]
              <br />
              Want: [{props.card.desired_slots.toString()}]
            </Typography>
          )}
          {props.buttonset === "completed" && (
            <Typography variant="h6">
              {props.card.module_code}
              <br />
              {props.card.slot_type}
              <br />
              {props.card.day}
              <br />
              {props.card.venue}
              <br />
              {`${props.card.startTime} - ${props.card.endTime}`}
              <br />
              New: [{props.card.current_slot}], broken, new should be old
              <br />
              {/* need to find a way to get current slot and email of other guy */}
              Old: [{completedSwap.current_slot}], broken, old should not be an
              array
            </Typography>
          )}
        </CardContent>
        <CardActions className={classes.button}>{buttonset}</CardActions>
      </Card>
    </Grid>
  );
}
