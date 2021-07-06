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
  SHOW_SWAP_FAIL,
  SHOW_SWAP_REQUEST,
  SHOW_SWAP_SUCCESS,
  RESET_CREATE,
  RESET_SWAP,
} from "../actionTypes";

const initialState = {
  createLoading: false,
  deleteLoading: false,
  viewLoading: false,
  searchLoading: false,
  updateLoading: false,
  showLoading: false,

  createSuccess: false,
  deleteSuccess: false,
  viewSuccess: false,
  searchSuccess: false,
  updateSuccess: false,
  showSuccess: false,

  createError: false,
  deleteError: false,
  viewError: false,
  searchError: false,
  updateError: false,
  showError: false,

  errorMsg: [],
};

const swapReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SWAP_REQUEST:
      return {
        ...state,
        createLoading: true,
      };
    case VIEW_SWAP_REQUEST:
      return {
        ...state,
        viewLoading: true,
      };
    case DELETE_SWAP_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case UPDATE_SWAP_REQUEST:
      return {
        ...state,
        updateLoading: true,
      };
    case SEARCH_SWAP_REQUEST:
      return {
        ...state,
        searchLoading: true,
      };
    case SHOW_SWAP_REQUEST:
      return {
        ...state,
        showLoading: true,
      };
    case CREATE_SWAP_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
      };
    case VIEW_SWAP_SUCCESS:
      return {
        ...state,
        viewLoading: false,
        viewSuccess: true,
      };
    case DELETE_SWAP_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
      };
    case UPDATE_SWAP_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
      };
    case SEARCH_SWAP_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchSuccess: true,
      };
    case SHOW_SWAP_SUCCESS:
      return {
        ...state,
        showLoading: false,
        showSuccess: true,
      };
    case CREATE_SWAP_FAIL:
      return {
        ...state,
        createLoading: false,
        createError: true,
        errorMsg: action.payload,
      };
    case VIEW_SWAP_FAIL:
      return {
        ...state,
        viewLoading: false,
        viewError: true,
        errorMsg: action.payload,
      };
    case DELETE_SWAP_FAIL:
      return {
        ...state,
        deleteLoading: false,
        deleteError: true,
        errorMsg: action.payload,
      };
    case UPDATE_SWAP_FAIL:
      return {
        ...state,
        updateLoading: false,
        updateError: true,
        errorMsg: action.payload,
      };
    case SEARCH_SWAP_FAIL:
      return {
        ...state,
        searchLoading: false,
        searchError: true,
        errorMsg: action.payload,
      };
    case SHOW_SWAP_FAIL:
      return {
        ...state,
        showLoading: false,
        showError: true,
        errorMsg: action.payload,
      };
    case RESET_CREATE:
      return {
        ...state,
        createSuccess: false,
        createError: false,
        createLoading: false,
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
