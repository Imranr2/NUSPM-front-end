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
import useAuth from "../../hooks/useAuth";
import useSwap from "../../hooks/useSwap";
import CurrentSwapButtons from "../ButtonSets/CurrentSwapButtons";
import ReservedButtons from "../ButtonSets/ReservedButtons";
import CompletedSwapButtons from "../ButtonSets/CompletedSwapButtons";
import InitiateButtons from "../ButtonSets/InitiateButtons";
import { PinDropSharp } from "@material-ui/icons";

export default function Swap(props) {
  const classes = useStyles();
  let buttonset = null;
  const { completedSwap, showSwap } = useSwap();
  const { user, getUser } = useAuth();

  switch (props.buttonset) {
    case "currentSwap":
      buttonset = (
        <CurrentSwapButtons swapDetails={props.card} status={props.status} />
      );
      break;
    // case "reserved":
    //   buttonset = (
    //     <ReservedButtons swapDetails={props.card} status={props.status} />
    //   );
    //   break;
    case "completedSwap":
      buttonset = (
        <CompletedSwapButtons swapDetails={props.card} status={props.status} />
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
      if (props.offer[0].initiatorSwapId !== props.card.id) {
        showSwap(props.offer[0].initiatorSwapId);
      } else {
        showSwap(props.offer[0].creatorSwapId);
      }
    }
  }, []);

  useEffect(() => {
    if (completedSwap !== undefined) {
      console.log(completedSwap);
      getUser(completedSwap.user_id);
    }
  }, [completedSwap]);

  return (
    <Grid key={props} container item xs={12} sm={6} md={4} justify="center">
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          {props.buttonset === "currentSwap" && (
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
          {props.buttonset === "completedSwap" && (
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
              New: [{completedSwap.current_slot}]
              <br />
              {/* need to find a way to get current slot and email of other guy */}
              Old: [{props.card.current_slot}]
              <br />
              {user.email}
            </Typography>
          )}
        </CardContent>
        <CardActions className={classes.button}>{buttonset}</CardActions>
      </Card>
    </Grid>
  );
}
