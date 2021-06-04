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
} from "../actionTypes";

const initialState = {
  isLoading: false,
  success: false,
  errorMsg: [],
};

const swapReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REQUEST:
    case VIEW_REQUEST:
    case DELETE_REQUEST:
    case UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_SUCCESS:
    case VIEW_SUCCESS:
    case DELETE_SUCCESS:
    case UPDATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
      };
    case CREATE_FAIL:
    case VIEW_FAIL:
    case DELETE_FAIL:
    case UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default swapReducer;
