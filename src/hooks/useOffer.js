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
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";

const useOffer = () => {
  const [userOffer, setUserOffer] = useState([]);
  const dispatch = useDispatch();

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const createOffer = (
    initiatorSwapId,
    creatorSwapId,
    accepted,
    pending,
    rejected,
    initiated
  ) => {
    dispatch(createOfferRequest());
    axios
      .post(
        "http://localhost:3001/api/v1/offers",
        {
          initiator_swap_id: initiatorSwapId,
          creator_swap_id: creatorSwapId,
          accepted: accepted,
          pending: pending,
          rejected: rejected,
          initiated: initiated,
        },
        {
          headers,
        }
      )
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

  const viewOffers = () => {
    dispatch(viewOfferRequest());
    axios
      .get("http://localhost:3001/api/v1/offers", {
        headers,
      })
      .then((response) => {
        dispatch(viewOfferSuccess());
        setUserOffer(response.data);
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      })
      .catch((error) => {
        dispatch(viewOfferFail());
        setTimeout(() => {
          dispatch(resetOffer());
        }, 3000);
      });
  };

  const deleteOffer = (offerId) => {
    dispatch(deleteOfferRequest());
    axios
      .delete(`http://localhost:3001/api/v1/offers/${offerId}`, {
        headers,
      })
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

  const updateOffer = (offerId, accepted, pending, rejected) => {
    dispatch(updateOfferRequest());
    axios
      .put(
        `http://localhost:3001/api/v1/offers/${offerId}`,
        {
          accepted: accepted,
          pending: pending,
          rejected: rejected,
        },
        {
          headers,
        }
      )
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
    axios
      .post(
        `http://localhost:3001/api/v1/withdrawOffer`,
        {
          swap_id: swapId,
        },
        {
          headers,
        }
      )
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

export default useOffer();
