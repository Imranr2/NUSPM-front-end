import React from "react";
import { useState, useEffect } from "react";
import { Button, ThemeProvider } from "@material-ui/core";
import { theme } from "../../Theme";
import useOffer from "../../hooks/useOffer";
import useSwap from "../../hooks/useSwap";
import useNotification from "../../hooks/useNotification";

export default function CurrentOfferButtons({
  offerDetails,
  initiatorSwap,
  creatorSwap,
}) {
  const { updateOffer, withdrawOffers, withdrawOtherUserOffers } = useOffer();
  const { updateSwap } = useSwap();
  const { createNotification } = useNotification();

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
    createNotification(
      `You have accepted an offer to swap ${creatorSwap.module_code} ${creatorSwap.slot_type} [${creatorSwap.current_slot}] for ${initiatorSwap.module_code} ${initiatorSwap.slot_type} [${initiatorSwap.current_slot}]`,
      offerDetails.id,
      "Offer",
      offerDetails.creatorUserId
    );
    createNotification(
      `Your offer to swap ${initiatorSwap.module_code} ${initiatorSwap.slot_type} [${initiatorSwap.current_slot}] for ${creatorSwap.module_code} ${creatorSwap.slot_type} [${creatorSwap.current_slot}] has been accepted`,
      offerDetails.id,
      "Offer",
      offerDetails.initiatorUserId
    );
    withdrawOtherUserOffers(
      offerDetails.initiatorSwapId,
      offerDetails.creatorSwapId
    );
  }

  function handleReject() {
    updateOffer(offerDetails.id, false, false);
    createNotification(
      `You have rejected an offer to swap ${creatorSwap.module_code} ${creatorSwap.slot_type} [${creatorSwap.current_slot}] for ${initiatorSwap.module_code} ${initiatorSwap.slot_type} [${initiatorSwap.current_slot}]`,
      offerDetails.id,
      "Offer",
      offerDetails.creatorUserId
    );
    createNotification(
      `Your offer to swap ${initiatorSwap.module_code} ${initiatorSwap.slot_type} [${initiatorSwap.current_slot}] for ${creatorSwap.module_code} ${creatorSwap.slot_type} [${creatorSwap.current_slot}] has been rejected`,
      offerDetails.id,
      "Offer",
      offerDetails.initiatorUserId
    );
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
