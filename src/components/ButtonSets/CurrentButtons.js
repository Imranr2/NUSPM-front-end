import React from "react";
import { useState, useEffect } from "react";
import { Button, ThemeProvider } from "@material-ui/core";
import { theme } from "../../Theme";
import useOffer from "../../hooks/useOffer";
import useSwap from "../../hooks/useSwap";

export default function CurrentButtons({
  offerDetails,
  status,
  initiatorSwap,
  creatorSwap,
}) {
  const { updateOffer, withdrawOffers } = useOffer();
  const { updateSwap } = useSwap();

  function handleAccept() {
    updateOffer(offerDetails.id, true, false);
    withdrawOffers(offerDetails.creatorSwapId);
    updateSwap(
      initiatorSwap.id,
      initiatorSwap.module_code,
      initiatorSwap.slot_type,
      initiatorSwap.current_slot,
      initiatorSwap.desired_slots,
      true
    );
    updateSwap(
      creatorSwap.id,
      creatorSwap.module_code,
      creatorSwap.slot_type,
      creatorSwap.current_slot,
      creatorSwap.desired_slots,
      true
    );
    setTimeout(() => {
      status();
    }, 1500);
  }

  function handleReject() {
    updateOffer(offerDetails.id, false, false);
    setTimeout(() => {
      status();
    }, 1500);
  }

  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" color="primary" onClick={handleAccept}>
        Accept
      </Button>
      <Button variant="outlined" color="primary" onClick={handleReject}>
        Reject
      </Button>
    </ThemeProvider>
  );
}
