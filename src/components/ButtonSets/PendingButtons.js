import React from "react";
import { useState, useEffect } from "react";
import { Button, ThemeProvider } from "@material-ui/core";
import { theme } from "../../Theme";
import axios from "axios";
import useOffer from "../../hooks/useOffer";

export default function PendingButtons({ offerDetails, status }) {
  const { deleteOffer } = useOffer();

  function handleWithdraw() {
    deleteOffer(offerDetails.id);
    setTimeout(() => {
      status();
    }, 1500);
  }

  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" color="primary" onClick={handleWithdraw}>
        Withdraw Offer
      </Button>
    </ThemeProvider>
  );
}
