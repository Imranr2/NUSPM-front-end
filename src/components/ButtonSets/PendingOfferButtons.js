import React from "react";
import { Button, ThemeProvider } from "@material-ui/core";
import { theme } from "../../Theme";
import useOffer from "../../hooks/useOffer";

export default function PendingOfferButtons({ offerDetails }) {
  const { deleteOffer } = useOffer();

  function handleWithdraw() {
    deleteOffer(offerDetails.id);
  }

  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" color="primary" onClick={handleWithdraw}>
        Withdraw Offer
      </Button>
    </ThemeProvider>
  );
}
