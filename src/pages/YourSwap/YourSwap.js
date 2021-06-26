import NavBar from "../../components/NavBar";
import {
  ThemeProvider,
  Container,
  Tabs,
  Tab,
  setRef,
  Dialog,
  Typography,
} from "@material-ui/core";
import { theme } from "../../Theme";
import { useState, useEffect } from "react";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import useOffer from "../../hooks/useOffer";
import SwapList from "../../components/SwapList/SwapList";
import OfferList from "../../components/OfferList/OfferList";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { Alert } from "@material-ui/lab";

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
      <NavBar arr={[false, true, false]} />
      <Container className={classes.main}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
          onChange={handleChange}
        >
          <Tab label="Current Offers" />
          <Tab label="Current Swaps" />
          <Tab label="Pending Offers" />
          <Tab label="Completed Swaps" />
          <Tab label="Rejected Offers" />
        </Tabs>
        {(swapLoading || offerLoading) && <PulseLoader color="#0D169F" />}
        {/* some other loader in center of page */}
        {value === 0 && (
          <>
            <Alert severity="info" className={classes.alert}>
              Click on the offer to view pending slot details and accept or
              reject the offer
            </Alert>
            <OfferList
              arr={userOffer.filter(
                (offer) =>
                  offer.creatorUserId === userId &&
                  !offer.isAccepted &&
                  offer.isPending
              )}
              status={changeStatus}
              tab="current"
            />
          </>
        )}

        {/* test and check with actual users on what they want */}
        {value === 1 && (
          <>
            <Alert severity="info" className={classes.alert}>
              Caution: Deleting your swap request will withdraw and reject all
              offers. Edits to your swap request will be reflected on all
              current and pending offers
            </Alert>
            <SwapList
              arr={userSwaps.filter(
                (swap) =>
                  !swap.isCompleted &&
                  !userOffer
                    .map((offer) => offer.initiator_swap_id)
                    .includes(swap.id) &&
                  !userOffer
                    .map((offer) => offer.creator_swap_id)
                    .includes(swap.id)
              )}
              panel="open"
              status={changeStatus}
            />
          </>
        )}

        {value === 2 && (
          <>
            <Alert severity="info" className={classes.alert}>
              Click on the card to withdraw your offer
            </Alert>
            <OfferList
              arr={userOffer.filter(
                (offer) =>
                  offer.initiatorUserId === userId &&
                  !offer.isAccepted &&
                  offer.isPending
              )}
              status={changeStatus}
              tab="pending"
            />
          </>
        )}
        {value === 3 && (
          <>
            <Alert severity="info" className={classes.alert}>
              Contact the other party with the email displayed in the card
            </Alert>
            <SwapList
              arr={userSwaps.filter((swap) => swap.isCompleted)}
              panel="completed"
              status={changeStatus}
            />
          </>
        )}
        {value === 4 && (
          <>
            <Alert severity="info" className={classes.alert}>
              All your rejected offers are displayed here
            </Alert>
            <OfferList
              arr={userOffer.filter(
                (offer) => !offer.isAccepted && !offer.isPending
              )}
              status={changeStatus}
              tab="rejected"
            />
          </>
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
