import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../../Theme";
import useSwap from "../../hooks/useSwap";

export default function ReservedButtons({ swapDetails, status }) {
  const [freeOpen, setFreeOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { deleteSwap, updateSwap } = useSwap();

  const handleUnreserveClickOpen = () => {
    setFreeOpen(true);
  };

  const handleUnreserveClose = () => {
    setFreeOpen(false);
  };

  const handleCompleteClickOpen = () => {
    setCompleteOpen(true);
  };

  const handleCompleteClose = () => {
    setCompleteOpen(false);
  };

  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleUnreserve = () => {
    setFreeOpen(false);
    updateSwap(
      swapDetails.id,
      swapDetails.module_code,
      swapDetails.slot_type,
      swapDetails.current_slot,
      swapDetails.desired_slots,
      false,
      false
    );
    setTimeout(() => {
      status();
    }, 1500);
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    deleteSwap(swapDetails.id);
    setTimeout(() => {
      status();
    }, 1500);
  };

  const handleComplete = () => {
    setCompleteOpen(false);
    updateSwap(
      swapDetails.id,
      swapDetails.module_code,
      swapDetails.slot_type,
      swapDetails.current_slot,
      swapDetails.desired_slots,
      true,
      false
    );
    setTimeout(() => {
      status();
    }, 1500);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleUnreserveClickOpen}
      >
        Unreserve
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

      <Button
        variant="outlined"
        color="primary"
        onClick={handleCompleteClickOpen}
      >
        Complete
      </Button>
      <Dialog
        open={completeOpen}
        onClose={handleCompleteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Complete Swap</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCompleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleComplete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleDeleteClickOpen}
      >
        DELETE
      </Button>
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Swap</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
