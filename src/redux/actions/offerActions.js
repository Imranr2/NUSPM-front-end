import {
  CREATE_OFFER_FAIL,
  CREATE_OFFER_REQUEST,
  CREATE_OFFER_SUCCESS,
  VIEW_OFFER_FAIL,
  VIEW_OFFER_REQUEST,
  VIEW_OFFER_SUCCESS,
  DELETE_OFFER_FAIL,
  DELETE_OFFER_REQUEST,
  DELETE_OFFER_SUCCESS,
  WITHDRAW_OFFER_REQUEST,
  WITHDRAW_OFFER_FAIL,
  WITHDRAW_OFFER_SUCCESS,
  UPDATE_OFFER_REQUEST,
  UPDATE_OFFER_FAIL,
  UPDATE_OFFER_SUCCESS,
  RESET_OFFER,
} from "../actionTypes";

export const createOfferRequest = () => {
  return {
    type: CREATE_OFFER_REQUEST,
  };
};

export const createOfferFail = (error) => {
  return {
    type: CREATE_OFFER_FAIL,
    payload: error,
  };
};

export const createOfferSuccess = () => {
  return {
    type: CREATE_OFFER_SUCCESS,
  };
};

export const viewOfferRequest = () => {
  return {
    type: VIEW_OFFER_REQUEST,
  };
};
export const viewOfferFail = (error) => {
  return {
    type: VIEW_OFFER_FAIL,
    payload: error,
  };
};

export const viewOfferSuccess = () => {
  return {
    type: VIEW_OFFER_SUCCESS,
  };
};

export const deleteOfferRequest = () => {
  return {
    type: DELETE_OFFER_REQUEST,
  };
};

export const deleteOfferFail = (error) => {
  return {
    type: DELETE_OFFER_FAIL,
    payload: error,
  };
};

export const deleteOfferSuccess = () => {
  return {
    type: DELETE_OFFER_SUCCESS,
  };
};

export const withdrawOfferRequest = () => {
  return {
    type: WITHDRAW_OFFER_REQUEST,
  };
};

export const withdrawOfferFail = (error) => {
  return {
    type: WITHDRAW_OFFER_FAIL,
    payload: error,
  };
};

export const withdrawOfferSuccess = () => {
  return {
    type: WITHDRAW_OFFER_SUCCESS,
  };
};

export const updateOfferRequest = () => {
  return {
    type: UPDATE_OFFER_REQUEST,
  };
};

export const updateOfferFail = (error) => {
  return {
    type: UDPATE_OFFER_FAIL,
    payload: error,
  };
};

export const updateOfferSuccess = () => {
  return {
    type: UPDATE_OFFER_SUCCESS,
  };
};

export const resetOffer = () => {
  return {
    type: RESET_OFFER,
  };
};
