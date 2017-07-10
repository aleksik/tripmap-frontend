import { LOCATION_CHANGE } from 'react-router-redux';

import {
  REQUEST_PLACES,
  SET_PLACES
} from '../actions/places';


const initialState = {
  places: [],
  activePlace: null,
  isRequesting: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case LOCATION_CHANGE:
      const idMatch = action.payload.pathname.match(/^\/place\/([a-zA-Z0-9]+)$/);
      return {
        ...state,
        activePlace: idMatch && idMatch.length >= 2 ? idMatch[1] : null
      };

    case REQUEST_PLACES:
      return {
        ...state,
        isRequesting: true
      };

    case SET_PLACES:
      return {
        ...state,
        places: action.places
      };
    
    default:
      return state;
  }
}