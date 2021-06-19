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
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  // CHANGED HERE (DELETE COMMENT ONCE SEEN)
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
        dispatch(createOfferFail(error.response.data));
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      });
  };

  // WILL SHOW ALL OFFERS WHERE INITIATOR ID OR CREATOR ID == LOCALSTORAGE USER (DELETE ONCE SEEN)
  const viewOffers = () => {
    dispatch(viewOfferRequest());
    authAxios
      .get("/api/v1/offers")
      .then((response) => {
        setUserOffer(response.data);
        dispatch(viewOfferSuccess());
        setRefresh(false);
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      })
      .catch((error) => {
        dispatch(viewOfferFail(error.response.data));
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
        console.log(response.data);
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      })
      .catch((error) => {
        dispatch(deleteOfferFail(error.response.data));
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      });
  };

  // CHANGED HERE (DELETE COMMENT ONCE SEEN)
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
        dispatch(updateOfferFail(error.response.data));
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      });
  };

  const withdrawOffers = (swapId) => {
    dispatch(withdrawOfferRequest());
    authAxios
      .post(`http://localhost:3001/api/v1/withdrawOffer`, {
        swap_id: swapId,
      })
      .then((response) => {
        dispatch(withdrawOfferSuccess());
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      })
      .catch((error) => {
        dispatch(withdrawOfferFail(error.response.data));
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      });
  };

  return {
    userOffer,
    setUserOffer,
    createOffer,
    viewOffers,
    deleteOffer,
    updateOffer,
    withdrawOffers,
  };
};

export default useOffer;
