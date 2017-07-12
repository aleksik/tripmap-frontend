import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS
} from '../actions/user';

const initialState = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  user: {},
  message: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        message: null
      };
    
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.user
      };
    
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        message: action.message
      };
    
    case LOGOUT_REQUEST:
      return {
        isRequesting: true
      };
    
    case LOGOUT_SUCCESS:
      return {
        isRequesting: false,
        isAuthenticated: false,
        user: {}
      }
    
    default:
      return state;
  }
}