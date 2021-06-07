import {
  CREATE_FAIL,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  VIEW_FAIL,
  VIEW_REQUEST,
  VIEW_SUCCESS,
  UPDATE_FAIL,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  DELETE_FAIL,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  SEARCH_FAIL,
  SEARCH_SUCCESS,
  SEARCH_REQUEST,
  RESET_SWAP,
} from "../actionTypes";

export const createRequest = () => {
  return {
    type: CREATE_REQUEST,
  };
};

export const createFail = (error) => {
  return {
    type: CREATE_FAIL,
    payload: error,
  };
};

export const createSuccess = () => {
  return {
    type: CREATE_SUCCESS,
  };
};

export const viewRequest = () => {
  return {
    type: VIEW_REQUEST,
  };
};

export const viewFail = (error) => {
  return {
    type: VIEW_FAIL,
    payload: error,
  };
};

export const viewSuccess = () => {
  return {
    type: VIEW_SUCCESS,
  };
};

export const updateRequest = () => {
  return {
    type: UPDATE_REQUEST,
  };
};

export const updateFail = (error) => {
  return {
    type: UPDATE_FAIL,
    payload: error,
  };
};

export const updateSuccess = () => {
  return {
    type: UPDATE_SUCCESS,
  };
};

export const deleteRequest = () => {
  return {
    type: DELETE_REQUEST,
  };
};

export const deleteFail = (error) => {
  return {
    type: DELETE_FAIL,
    payload: error,
  };
};

export const deleteSuccess = () => {
  return {
    type: DELETE_SUCCESS,
  };
};

export const searchRequest = () => {
  return {
    type: SEARCH_REQUEST,
  };
};

export const searchFail = () => {
  return {
    type: SEARCH_FAIL,
  };
};

export const searchSuccess = () => {
  return {
    type: SEARCH_SUCCESS,
  };
};

export const resetSwap = () => {
  return {
    type: RESET_SWAP,
  };
};
