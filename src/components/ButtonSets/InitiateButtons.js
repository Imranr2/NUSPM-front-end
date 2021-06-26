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

export default function InitiateButtons() {
  const [initiateOpen, setInitiateOpen] = useState(false);

  const handleInitiateClickOpen = () => {
    setInitiateOpen(true);
  };

  const handleInitiateClose = () => {
    setInitiateOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleInitiateClickOpen}
      >
        Initiate Swap
      </Button>
      <Dialog
        open={initiateOpen}
        onClose={handleInitiateClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Initiate Swap</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInitiateClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleInitiateClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
