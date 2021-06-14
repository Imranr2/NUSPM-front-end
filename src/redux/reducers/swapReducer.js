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
  SEARCH_SWAP_REQUEST,
  SEARCH_SWAP_SUCCESS,
  RESET_SWAP,
} from "../actionTypes";

const initialState = {
  isLoading: false,
  success: false,
  error: false,
  errorMsg: [],
};

const swapReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SWAP_REQUEST:
    case VIEW_SWAP_REQUEST:
    case DELETE_SWAP_REQUEST:
    case UPDATE_SWAP_REQUEST:
    case SEARCH_SWAP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_SWAP_SUCCESS:
    case VIEW_SWAP_SUCCESS:
    case DELETE_SWAP_SUCCESS:
    case UPDATE_SWAP_SUCCESS:
    case SEARCH_SWAP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case CREATE_SWAP_FAIL:
    case VIEW_SWAP_FAIL:
    case DELETE_SWAP_FAIL:
    case UPDATE_SWAP_FAIL:
    case SEARCH_SWAP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMsg: action.payload,
      };
    case RESET_SWAP:
      return {
        initialState,
      };
    default:
      return state;
  }
};

export default swapReducer;
