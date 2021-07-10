import React from "react";
import { useState, useEffect } from "react";
import { Button, ThemeProvider } from "@material-ui/core";
import { theme } from "../../Theme";
import axios from "axios";
import useOffer from "../../hooks/useOffer";
import useNotification from "../../hooks/useNotification";

export default function PendingOfferButtons({ offerDetails }) {
  const { deleteOffer } = useOffer();
  const { createNotification } = useNotification();

  function handleWithdraw() {
    deleteOffer(offerDetails.id);
    createNotification(
      `You have withdrawn your offer to swap ${offerDetails.initiatorSwap.module_code} ${offerDetails.initiatorSwap.slot_type} [${offerDetails.initiatorSwap.current_slot} for ${offerDetails.creatorSwap.module_code} ${offerDetails.initiatorSwap.slot_type} [${offerDetails.creatorSwap.current_slot}]`,
      offerDetails.id,
      "Offer"
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" color="primary" onClick={handleWithdraw}>
        Withdraw Offer
      </Button>
    </ThemeProvider>
  );
}
