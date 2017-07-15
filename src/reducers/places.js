import { LOCATION_CHANGE } from 'react-router-redux';

import {
  PLACES_REQUEST,
  PLACES_SUCCESS,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE
} from '../actions/places';


const initialState = {
  places: [],
  activePlace: null,
  isFetching: false,
  isCreating: false,
  createErrors: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case LOCATION_CHANGE:
      const idMatch = action.payload.pathname.match(/^\/place\/([a-zA-Z0-9]+)$/);
      return {
        ...state,
        activePlace: idMatch && idMatch.length >= 2 ? idMatch[1] : null
      };

    case PLACES_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case PLACES_SUCCESS:
      return {
        ...state,
        places: action.places,
        isFetching: false
      };
    
    case CREATE_REQUEST:
      return {
        ...state,
        isCreating: true,
        createErrors: null
      };
    
    case CREATE_SUCCESS:
      const newState = { 
        ...state,
        isCreating: false,
        createErrors: null
      };
      newState.places.push(action.place);
      return newState;
    
    case CREATE_FAILURE:
      return {
        ...state,
        createErrors: action.createErrors
      }

    default:
      return state;
  }
}