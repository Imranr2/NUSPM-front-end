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

export default function Swap(props) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Grid key={props} item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h5">
              {props.current_slot}
              <br />
              {props.day}
              <br />
              {props.venue}
              <br />
              {`${props.startTime} - ${props.endTime}`}
              <br />
            </Typography>
          </CardContent>
          <CardActions className={classes.button}>
            <Button size="small" color="primary">
              Initiate Swap
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}
