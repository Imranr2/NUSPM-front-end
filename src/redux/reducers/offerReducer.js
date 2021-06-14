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
  WITHDRAW_OFFER_FAIL,
  WITHDRAW_OFFER_REQUEST,
  WITHDRAW_OFFER_SUCCESS,
  UPDATE_OFFER_FAIL,
  UPDATE_OFFER_REQUEST,
  UPDATE_OFFER_SUCCESS,
  RESET_OFFER,
} from "../actionTypes";

const initialState = {
  isLoading: false,
  success: false,
  error: false,
  errorMsg: [],
};

const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_OFFER_REQUEST:
    case VIEW_OFFER_REQUEST:
    case DELETE_OFFER_REQUEST:
    case WITHDRAW_OFFER_REQUEST:
    case UPDATE_OFFER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_OFFER_SUCCESS:
    case VIEW_OFFER_SUCCESS:
    case DELETE_OFFER_SUCCESS:
    case WITHDRAW_OFFER_SUCCESS:
    case UPDATE_OFFER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
      };

    case CREATE_OFFER_FAIL:
    case VIEW_OFFER_FAIL:
    case DELETE_OFFER_FAIL:
    case WITHDRAW_OFFER_FAIL:
    case UPDATE_OFFER_FAIL:
      return {
        ...state,
        isLoading: true,
        error: true,
        errorMsg: action.payload,
      };
    case RESET_OFFER:
      return {
        initialState,
      };
    default:
      return state;
  }
};

export default offerReducer;
