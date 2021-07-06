import NavBar from "../../components/NavBar";
import {
  ThemeProvider,
  Container,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { theme, useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import useOffer from "../../hooks/useOffer";
import SwapList from "../../components/SwapList/SwapList";
import OfferList from "../../components/OfferList/OfferList";
import { connect } from "react-redux";
import { PulseLoader } from "react-spinners";
import { Alert } from "@material-ui/lab";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import { useMediaQuery } from "react-responsive";

function YourSwap({
  swapLoading,
  offerLoading,
  swapError,
  offerError,
  swapErrorMsg,
  offerErrorMsg,
  updateSwapSuccess,
  updateOfferSuccess,
  deleteSwapSuccess,
  deleteOfferSuccess,
  viewOfferLoading,
  viewSwapLoading,
  userId,
}) {
  const [value, setValue] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const { userSwaps, viewSwaps } = useSwap();
  const { userOffer, viewOffers } = useOffer();

  const currentOffer = userOffer.filter(
    (offer) =>
      offer.creatorUserId === userId && !offer.isAccepted && offer.isPending
  );
  const currentSwap = userSwaps.filter((swap) => !swap.isCompleted);
  const pendingOffer = userOffer.filter(
    (offer) =>
      offer.initiatorUserId === userId && !offer.isAccepted && offer.isPending
  );
  const completedSwap = userSwaps.filter((swap) => swap.isCompleted);
  const rejectedOffer = userOffer.filter(
    (offer) => !offer.isAccepted && !offer.isPending
  );

  const isSmallScreen = useMediaQuery({ query: "(max-width:850px)" });
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: "(min-width: 701px)",
  // });

  useEffect(() => {
    viewSwaps();
    viewOffers();
  }, [
    updateOfferSuccess,
    updateSwapSuccess,
    deleteOfferSuccess,
    deleteSwapSuccess,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        disableGutters={true}
        className={classes.main}
        maxWidth="false"
      >
        <NavBar arr={[false, true, false]} />
        <Container className={classes.content}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabs}
            onChange={handleChange}
            centered={true}
            variant="fullwidth"
          >
            <Tab
              label={isSmallScreen ? null : "Current Offers"}
              icon={isSmallScreen ? <LocalOfferIcon color="primary" /> : null}
            />
            <Tab
              label={isSmallScreen ? null : "Current Swaps"}
              icon={isSmallScreen ? <SwapHorizIcon color="primary" /> : null}
            />
            <Tab
              label={isSmallScreen ? null : "Pending Offers"}
              icon={isSmallScreen ? <LocalOfferIcon color="disabled" /> : null}
            />
            <Tab
              label={isSmallScreen ? null : "Completed Swaps"}
              icon={isSmallScreen ? <SwapHorizIcon color="action" /> : null}
            />
            <Tab
              label={isSmallScreen ? null : "Rejected Offers"}
              icon={isSmallScreen ? <LocalOfferIcon color="error" /> : null}
            />
          </Tabs>
          {(swapLoading || offerLoading) && <PulseLoader color="#0D169F" />}

          {value === 0 && (
            <>
              {isSmallScreen && (
                <Typography color="primary" variant="h5">
                  Current Offers
                </Typography>
              )}
              <Alert severity="info" className={classes.alert}>
                Click on the offer to view pending slot details and accept or
                reject the offer
              </Alert>
              <OfferList arr={currentOffer} tab="currentOffer" />
              {currentOffer.length === 0 && !viewOfferLoading && (
                <>
                  <br />
                  <Alert severity="warning" className={classes.alert}>
                    No offers at the moment
                  </Alert>
                </>
              )}
              {offerError && (
                <>
                  <Alert severity="warning" className={classes.alert}>
                    {offerErrorMsg}
                  </Alert>
                </>
              )}
            </>
          )}

          {/* test and check with actual users on what they want */}
          {value === 1 && (
            <>
              {isSmallScreen && (
                <Typography color="primary" variant="h5">
                  Current Swaps
                </Typography>
              )}
              <Alert severity="info" className={classes.alert}>
                Caution: Editing or deleting your swap request will withdraw and
                reject all offers pertaining to the request
              </Alert>
              <SwapList
                arr={currentSwap}
                panel="currentSwap"
                offers={userOffer.filter((offer) => offer.isPending)}
              />
              {currentSwap.length === 0 && !viewSwapLoading && (
                <>
                  <br />
                  <Alert severity="warning" className={classes.alert}>
                    No swaps at the moment
                  </Alert>
                </>
              )}
              {swapError && (
                <>
                  <Alert severity="warning" className={classes.alert}>
                    {swapErrorMsg}
                  </Alert>
                </>
              )}
            </>
          )}

          {value === 2 && (
            <>
              {isSmallScreen && (
                <Typography color="primary" variant="h5" color="primary">
                  Pending Offers
                </Typography>
              )}
              <Alert severity="info" className={classes.alert}>
                Click on the card to withdraw your offer
              </Alert>
              <OfferList arr={pendingOffer} tab="pendingOffer" />
              {pendingOffer.length === 0 && !viewOfferLoading && (
                <>
                  <br />
                  <Alert severity="warning" className={classes.alert}>
                    No pending offers at the moment
                  </Alert>
                </>
              )}
              {offerError && (
                <>
                  <Alert severity="warning" className={classes.alert}>
                    {offerErrorMsg}
                  </Alert>
                </>
              )}
            </>
          )}

          {value === 3 && (
            <>
              {isSmallScreen && (
                <Typography variant="h5" color="primary">
                  Completed Swaps
                </Typography>
              )}
              <Alert severity="info" className={classes.alert}>
                Contact the other party with the email displayed in the card
              </Alert>
              <SwapList
                arr={completedSwap}
                panel="completedSwap"
                offers={userOffer.filter((offer) => offer.isAccepted)}
              />
              {completedSwap.length === 0 && !viewSwapLoading && (
                <>
                  <br />
                  <Alert severity="warning" className={classes.alert}>
                    No completed swaps at the moment
                  </Alert>
                </>
              )}
              {swapError && (
                <>
                  <Alert severity="warning" className={classes.alert}>
                    {swapErrorMsg}
                  </Alert>
                </>
              )}
            </>
          )}

          {value === 4 && (
            <>
              {isSmallScreen && (
                <Typography variant="h5" color="primary">
                  Rejected Offers
                </Typography>
              )}
              <Alert severity="info" className={classes.alert}>
                All your rejected offers are displayed here
              </Alert>
              <OfferList arr={rejectedOffer} tab="rejectedOffer" />
              {rejectedOffer.length === 0 && !viewOfferLoading && (
                <>
                  <br />
                  <Alert severity="warning" className={classes.alert}>
                    No rejected offers at the moment
                  </Alert>
                </>
              )}
              {offerError && (
                <>
                  <Alert severity="warning" className={classes.alert}>
                    {offerErrorMsg}
                  </Alert>
                </>
              )}
            </>
          )}
        </Container>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    swapLoading: state.swap.viewLoading,
    offerLoading: state.offer.viewLoading,
    swapError: state.swap.viewError,
    offerError: state.offer.viewError,
    swapErrorMsg: state.swap.errorMsg,
    offerErrorMsg: state.offer.errorMsg,
    updateOfferSuccess: state.offer.updateSuccess,
    updateSwapSuccess: state.swap.updateSuccess,
    deleteOfferSuccess: state.offer.deleteSuccess,
    deleteSwapSuccess: state.swap.deleteSuccess,
    viewOfferLoading: state.offer.viewLoading,
    viewSwapLoading: state.swap.viewLoading,
    userId: state.auth.user.id,
  };
};
export default connect(mapStateToProps)(YourSwap);
