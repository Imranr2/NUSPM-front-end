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

export default function ReservedButtons() {
  const [freeOpen, setFreeOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleFreeClickOpen = () => {
    setFreeOpen(true);
  };

  const handleFreeClose = () => {
    setFreeOpen(false);
  };

  const handleReserveClickOpen = () => {
    setReserveOpen(true);
  };

  const handleReserveClose = () => {
    setReserveOpen(false);
  };

  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" color="primary" onClick={handleFreeClickOpen}>
        Free
      </Button>
      <Dialog
        open={freeOpen}
        onClose={handleFreeClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Free up Swap</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFreeClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFreeClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleReserveClickOpen}
      >
        Free
      </Button>
      <Dialog
        open={reserveOpen}
        onClose={handleReserveClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Reserve Swap</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReserveClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReserveClose} color="primary">
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
          <Button onClick={handleDeleteClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
