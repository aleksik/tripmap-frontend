import {
  LOCATION_CHANGE
} from 'react-router-redux';

import {
  ENABLE_EDIT_MODE,
  DISABLE_EDIT_MODE,
  SET_EDIT_MODE_MARKER
} from '../actions/map';

const initialState = {
  defaultCenter: {
    lat: 37.744392,
    lng: 20.8618543
  },
  editMode: false,
  editModeMarker: null
};

export default (state = initialState, action) => {
  switch (action.type) {

    case LOCATION_CHANGE:
      return {
        ...state,
        editMode: !!action.payload.pathname.match(/^\/add|\/edit$/)
      }

    case ENABLE_EDIT_MODE:
      return {
        ...state,
        editMode: true
      };
    
    case DISABLE_EDIT_MODE:
      return {
        ...state,
        editMode: false,
        editModeMarkerPosition: null
      };
    
    case SET_EDIT_MODE_MARKER:
      return {
        ...state,
        editModeMarker: action.position
      };
    
    default:
      return state;
  }
}