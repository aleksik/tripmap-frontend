import {
  REQUEST_PLACES,
  SET_PLACES
} from '../actions/places';

const initialState = {
  places: [],
  isRequesting: false
};

export default (state = initialState, action) => {
  switch (action.type) {

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