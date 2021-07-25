import {
  createOfferFail,
  createOfferRequest,
  createOfferSuccess,
  viewOfferSuccess,
  viewOfferFail,
  viewOfferRequest,
  deleteOfferFail,
  deleteOfferRequest,
  deleteOfferSuccess,
  withdrawOfferFail,
  withdrawOfferRequest,
  withdrawOfferSuccess,
  updateOfferFail,
  updateOfferRequest,
  updateOfferSuccess,
  resetOffer,
} from "../redux/actions/offerActions";
import authAxios from "../helpers/authAxios";
import { useDispatch } from "react-redux";
import { useState } from "react";

const useOffer = () => {
  const [userOffer, setUserOffer] = useState([]);
  const dispatch = useDispatch();

  const createOffer = (
    initiatorUserId,
    creatorUserId,
    initiatorSwapId,
    creatorSwapId,
    accepted,
    pending
  ) => {
    dispatch(createOfferRequest());
    authAxios
      .post("/api/v1/offers", {
        initiator_user_id: initiatorUserId,
        creator_user_id: creatorUserId,
        initiator_swap_id: initiatorSwapId,
        creator_swap_id: creatorSwapId,
        accepted: accepted,
        pending: pending,
      })
      .then((response) => {
        dispatch(createOfferSuccess());
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      })
      .catch((error) => {
        dispatch(createOfferFail(error.response));
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      });
  };

  const viewOffers = () => {
    dispatch(viewOfferRequest());
    authAxios
      .get("/api/v1/offers")
      .then((response) => {
        setUserOffer(response.data);
        dispatch(viewOfferSuccess());
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      })
      .catch((error) => {
        dispatch(viewOfferFail(error.response));
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      });
  };

  const deleteOffer = (offerId) => {
    dispatch(deleteOfferRequest());
    authAxios
      .delete(`/api/v1/offers/${offerId}`)
      .then((response) => {
        dispatch(deleteOfferSuccess());
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      })
      .catch((error) => {
        dispatch(deleteOfferFail(error.response));
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      });
  };

  const updateOffer = (offerId, accepted, pending) => {
    dispatch(updateOfferRequest());
    authAxios
      .put(`/api/v1/offers/${offerId}`, {
        accepted: accepted,
        pending: pending,
      })
      .then((response) => {
        dispatch(updateOfferSuccess());
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      })
      .catch((error) => {
        dispatch(updateOfferFail(error.response));
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      });
  };

  const withdrawOffers = (swapId) => {
    dispatch(withdrawOfferRequest());
    authAxios
      .post(`/api/v1/offers/withdrawCurrentUserOffers`, {
        swap_id: swapId,
      })
      .then((response) => {
        dispatch(withdrawOfferSuccess());
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      })
      .catch((error) => {
        dispatch(withdrawOfferFail(error.response));
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      });
  };

  const withdrawOtherUserOffers = (initiatorSwapId, creatorSwapId) => {
    dispatch(withdrawOfferRequest());
    authAxios
      .post(`/api/v1/offers/withdrawOtherUserOffers`, {
        initiator_swap_id: initiatorSwapId,
        creator_swap_id: creatorSwapId,
      })
      .then((response) => {
        dispatch(withdrawOfferSuccess());
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      })
      .catch((error) => {
        dispatch(withdrawOfferFail(error.response));
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      });
  };

  const rejectOffers = (swapId) => {
    authAxios
      .post("/api/v1/offers/rejectOffers", {
        swap_id: swapId,
      })
      .then((response) => {})
      .catch((error) => {});
  };

  return {
    userOffer,
    setUserOffer,
    createOffer,
    viewOffers,
    deleteOffer,
    updateOffer,
    withdrawOffers,
    withdrawOtherUserOffers,
    rejectOffers,
  };
};

export default useOffer;
