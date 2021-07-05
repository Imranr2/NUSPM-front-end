import {
  CREATE_SWAP_FAIL,
  CREATE_SWAP_REQUEST,
  CREATE_SWAP_SUCCESS,
  VIEW_SWAP_FAIL,
  VIEW_SWAP_REQUEST,
  VIEW_SWAP_SUCCESS,
  UPDATE_SWAP_FAIL,
  UPDATE_SWAP_REQUEST,
  UPDATE_SWAP_SUCCESS,
  DELETE_SWAP_FAIL,
  DELETE_SWAP_REQUEST,
  DELETE_SWAP_SUCCESS,
  SEARCH_SWAP_FAIL,
  SEARCH_SWAP_SUCCESS,
  SEARCH_SWAP_REQUEST,
  SHOW_SWAP_FAIL,
  SHOW_SWAP_REQUEST,
  SHOW_SWAP_SUCCESS,
  RESET_SWAP,
} from "../actionTypes";

export const createSwapRequest = () => {
  return {
    type: CREATE_SWAP_REQUEST,
  };
};

export const createSwapFail = (error) => {
  return {
    type: CREATE_SWAP_FAIL,
    payload: error,
  };
};

export const createSwapSuccess = () => {
  return {
    type: CREATE_SWAP_SUCCESS,
  };
};

export const viewSwapRequest = () => {
  return {
    type: VIEW_SWAP_REQUEST,
  };
};

export const viewSwapFail = (error) => {
  return {
    type: VIEW_SWAP_FAIL,
    payload: error,
  };
};

export const viewSwapSuccess = () => {
  return {
    type: VIEW_SWAP_SUCCESS,
  };
};

export const updateSwapRequest = () => {
  return {
    type: UPDATE_SWAP_REQUEST,
  };
};

export const updateSwapFail = (error) => {
  return {
    type: UPDATE_SWAP_FAIL,
    payload: error,
  };
};

export const updateSwapSuccess = () => {
  return {
    type: UPDATE_SWAP_SUCCESS,
  };
};

export const deleteSwapRequest = () => {
  return {
    type: DELETE_SWAP_REQUEST,
  };
};

export const deleteSwapFail = (error) => {
  return {
    type: DELETE_SWAP_FAIL,
    payload: error,
  };
};

export const deleteSwapSuccess = () => {
  return {
    type: DELETE_SWAP_SUCCESS,
  };
};

export const searchSwapRequest = () => {
  return {
    type: SEARCH_SWAP_REQUEST,
  };
};

export const searchSwapFail = (error) => {
  return {
    type: SEARCH_SWAP_FAIL,
    payload: error,
  };
};

export const searchSwapSuccess = () => {
  return {
    type: SEARCH_SWAP_SUCCESS,
  };
};

export const showSwapRequest = () => {
  return {
    type: SHOW_SWAP_REQUEST,
  };
};

export const showSwapFail = () => {
  return {
    type: SHOW_SWAP_FAIL,
  };
};

export const showSwapSuccess = (error) => {
  return {
    type: SHOW_SWAP_SUCCESS,
    payload: error,
  };
};

export const resetSwap = () => {
  return {
    type: RESET_SWAP,
  };
};
