import React from "react";
import { useState, useEffect } from "react";
import { Button, ThemeProvider } from "@material-ui/core";
import { theme } from "../../Theme";
import axios from "axios";

export default function CurrentButtons(props) {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  function handleAccept() {
    axios
      .put(
        `http://localhost:3001/api/v1/offers/${props.offerDetails.id}`,
        {
          accepted: true,
          pending: false,
        },
        {
          headers,
        }
      )
      .then((response) => {
        props.parentCallback(true);
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleReject() {
    axios
      .put(
        `http://localhost:3001/api/v1/offers/${props.offerDetails.id}`,
        {
          accepted: false,
          pending: false,
        },
        {
          headers,
        }
      )
      .then((response) => {
        props.parentCallback(true);
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      });
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
