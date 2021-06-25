import NavBar from "../../components/NavBar";
import { ThemeProvider, Container, Tabs, Tab, setRef } from "@material-ui/core";
import { theme } from "../../Theme";
import { useState, useEffect } from "react";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import useOffer from "../../hooks/useOffer";
import SwapList from "../../components/SwapList/SwapList";
import OfferList from "../../components/OfferList/OfferList";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";

function YourSwap({ success, swapLoading, offerLoading, userId }) {
  const [value, setValue] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const classes = useStyles();

  const changeStatus = () => {
    setRefresh(!refresh);
  };

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const { userSwaps, viewSwaps } = useSwap();
  const { userOffer, viewOffers } = useOffer();

  useEffect(() => {
    if (refresh) {
      viewSwaps();
      viewOffers();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <ThemeProvider theme={theme}>
      <NavBar arr={[false, false, true]} />
      <Container className={classes.main}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
          onChange={handleChange}
        >
          <Tab label="Current Offers" />
          <Tab label="Open Swaps" />
          <Tab label="Pending Offers" />
          <Tab label="Completed Swaps" />
          <Tab label="Rejected Offers" />
        </Tabs>
        {(swapLoading || offerLoading) && <PulseLoader color="#0D169F" />}
        {/* some other loader in center of page */}
        {value === 0 && (
          <OfferList
            arr={userOffer.filter(
              (offer) =>
                offer.creatorUserId === userId &&
                !offer.isAccepted &&
                offer.isPending
            )}
            parentCallback={changeStatus}
            tab="current"
          />
        )}
        {value === 1 && (
          <SwapList
            arr={userSwaps.filter((swap) => !swap.isCompleted)}
            panel="open"
            status={changeStatus}
          />
        )}

        {value === 2 && (
          <OfferList
            arr={userOffer.filter(
              (offer) =>
                offer.initiatorUserId === userId &&
                !offer.isAccepted &&
                offer.isPending
            )}
            parentCallback={changeStatus}
            tab="pending"
          />
        )}
        {value === 3 && (
          <SwapList
            arr={userSwaps.filter((swap) => swap.isCompleted)}
            panel="completed"
            status={changeStatus}
          />
        )}
        {value === 4 && (
          <OfferList
            arr={userOffer.filter(
              (offer) => !offer.isAccepted && !offer.isPending
            )}
            parentCallback={changeStatus}
            tab="rejected"
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    success: state.swap.success,
    swapLoading: state.swap.isLoading,
    offerLoading: state.offer.isLoading,
    userId: state.auth.user.id,
  };
};
export default connect(mapStateToProps)(YourSwap);
