import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ThemeProvider, Container, Typography } from "@material-ui/core";
import { theme } from "../../Theme";
import { useStyles } from "./theme";
import Navbar from "../../components/NavBar";
import useSwap from "../../hooks/useSwap";
import SwapList from "../../components/SwapList/SwapList";
import Offer from "../../components/Offer/Offer";

export default function Offers() {
  const classes = useStyles();

  const { userSwap, viewSwap } = useSwap();

  useEffect(() => viewSwap(), []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar arr={[false, true, false]} />
      <Container className={classes.main}>
        <Typography className={classes.header} variant="h4" color="primary">
          Current Offers
        </Typography>
        <Offer></Offer>
      </Container>
    </ThemeProvider>
  );
}
