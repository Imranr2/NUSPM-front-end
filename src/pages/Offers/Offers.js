import React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider, Container, Tabs, Tab } from "@material-ui/core";
import { theme } from "../../Theme";
import { useStyles } from "./theme";
import Navbar from "../../components/NavBar";
import useOffer from "../../hooks/useOffer";
import OfferList from "../../components/OfferList/OfferList";
import { connect } from "react-redux";

function Offers({ userId }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  const { userOffer, viewOffers } = useOffer();

  useEffect(() => viewOffers(), [userOffer]);

  return (
    <ThemeProvider theme={theme}>
      <Navbar arr={[false, true, false]} />
      <Container className={classes.main}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
          onChange={handleChange}
        >
          <Tab label="Current" />
          <Tab label="Pending" />
          <Tab label="Accepted" />
          <Tab label="Rejected" />
        </Tabs>
        {value === 0 && (
          <OfferList
            arr={userOffer.filter(
              (offer) =>
                offer.creatorUserId === userId &&
                !offer.isAccepted &&
                offer.isPending
            )}
          />
        )}
        {value === 1 && (
          <OfferList
            arr={userOffer.filter(
              (offer) =>
                offer.initiatorUserId === userId &&
                !offer.isAccepted &&
                offer.isPending
            )}
          />
        )}
        {value === 2 && (
          <OfferList
            arr={userOffer.filter(
              (offer) => offer.isAccepted && !offer.isPending
            )}
          />
        )}
        {value === 3 && (
          <OfferList
            arr={userOffer.filter(
              (offer) => !offer.isAccepted && !offer.isPending
            )}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user.id,
  };
};
export default connect(mapStateToProps)(Offers);
