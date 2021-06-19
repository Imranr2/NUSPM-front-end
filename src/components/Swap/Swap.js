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

  return (
    <Grid key={props} container item xs={12} sm={6} md={4} justify="center">
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">
            {props.card.module_code}
            <br />
            {props.card.slot_type} [{props.card.current_slot}]
            <br />
            {props.card.day}
            <br />
            {props.card.venue}
            <br />
            {`${props.card.startTime} - ${props.card.endTime}`}
            <br />
            {props.card.desired_slots}
          </Typography>
        </CardContent>
        <CardActions className={classes.button}>{buttonset}</CardActions>
      </Card>
    </Grid>
  );
}
