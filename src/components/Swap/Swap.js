import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import {
  ThemeProvider,
  Container,
  Grid,
  Button,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { theme } from "../../Theme";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import OpenButtons from "../ButtonSets/OpenButtons";
import ReservedButtons from "../ButtonSets/ReservedButtons";
import CompletedButtons from "../ButtonSets/CompletedButtons";
import InitiateButtons from "../ButtonSets/InitiateButtons";

export default function Swap(props) {
  const classes = useStyles();
  let buttonset = null;

  switch (props.buttonset) {
    case "open":
      buttonset = <OpenButtons />;
      break;
    case "reserved":
      buttonset = <ReservedButtons />;
      break;
    case "completed":
      buttonset = <CompletedButtons />;
      break;
    default:
      buttonset = <InitiateButtons />;
      break;
  }
  return (
    <Grid key={props} container item xs={12} sm={6} md={4} justify="center">
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">
            {props.card.module_code}
            <br />
            {props.card.slot_type}
            <br />
            {props.card.current_slot}
            <br />
            {props.card.day}
            <br />
            {props.card.venue}
            <br />
            {`${props.card.startTime} - ${props.card.endTime}`}
            <br />
          </Typography>
        </CardContent>
        <CardActions className={classes.button}>
          {/* <Button size="small" color="primary">
            Initiate Swap
          </Button> */}
          {buttonset}
        </CardActions>
      </Card>
    </Grid>
  );
}
