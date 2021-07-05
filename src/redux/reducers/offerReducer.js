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
  createLoading: false,
  deleteLoading: false,
  viewLoading: false,
  withdrawLoading: false,
  updateLoading: false,

  createSuccess: false,
  deleteSuccess: false,
  viewSuccess: false,
  withdrawSuccess: false,
  updateSuccess: false,

  createError: false,
  deleteError: false,
  viewError: false,
  withdrawError: false,
  updateError: false,

  errorMsg: [],
};

const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_OFFER_REQUEST:
      return {
        ...state,
        createLoading: true,
      };
    case VIEW_OFFER_REQUEST:
      return {
        ...state,
        viewLoading: true,
      };
    case DELETE_OFFER_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case WITHDRAW_OFFER_REQUEST:
      return {
        ...state,
        withdrawLoading: true,
      };
    case UPDATE_OFFER_REQUEST:
      return {
        ...state,
        updateLoading: true,
      };

    case CREATE_OFFER_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
      };
    case VIEW_OFFER_SUCCESS:
      return {
        ...state,
        viewLoading: false,
        viewSuccess: true,
      };
    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
      };
    case WITHDRAW_OFFER_SUCCESS:
      return {
        ...state,
        withdrawLoading: false,
        withdrawSuccess: true,
      };
    case UPDATE_OFFER_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
      };

    case CREATE_OFFER_FAIL:
      return {
        ...state,
        createLoading: true,
        createError: true,
        errorMsg: action.payload,
      };
    case VIEW_OFFER_FAIL:
      return {
        ...state,
        viewLoading: true,
        viewError: true,
        errorMsg: action.payload,
      };
    case DELETE_OFFER_FAIL:
      return {
        ...state,
        deleteLoading: true,
        deleteError: true,
        errorMsg: action.payload,
      };
    case WITHDRAW_OFFER_FAIL:
      return {
        ...state,
        withdrawLoading: true,
        withdrawError: true,
        errorMsg: action.payload,
      };
    case UPDATE_OFFER_FAIL:
      return {
        ...state,
        updateLoading: true,
        updateError: true,
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
