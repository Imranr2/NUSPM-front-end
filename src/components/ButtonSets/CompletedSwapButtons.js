import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../../Theme";
import useSwap from "../../hooks/useSwap";
import useOffer from "../../hooks/useOffer";

export default function CompletedSwapButtons({ swapDetails, offer }) {
  const [freeOpen, setFreeOpen] = useState(false);

  const { updateSwap } = useSwap();
  const { deleteOffer } = useOffer();

  const handleUnreserveClickOpen = () => {
    setFreeOpen(true);
  };

  const handleUnreserveClose = () => {
    setFreeOpen(false);
  };

  const handleUnreserve = () => {
    setFreeOpen(false);
    updateSwap(
      swapDetails.id,
      swapDetails.module_code,
      swapDetails.slot_type,
      swapDetails.current_slot,
      swapDetails.desired_slots,
      false
    );
    deleteOffer(offer.id);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleUnreserveClickOpen}
      >
        Free Swap
      </Button>
      <Dialog
        open={freeOpen}
        onClose={handleUnreserveClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Free up Swap</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUnreserveClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUnreserve} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
