import React from "react";
import { useState, useEffect } from "react";
import { Button, ThemeProvider } from "@material-ui/core";
import { theme } from "../../Theme";
import axios from "axios";

export default function CurrentButtons(props) {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  function handleWithdraw() {}

  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" color="primary" onClick={handleWithdraw}>
        Withdraw Offer
      </Button>
    </ThemeProvider>
  );
}
