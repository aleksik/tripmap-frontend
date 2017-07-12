export const ENABLE_EDIT_MODE = 'map/ENABLE_EDIT_MODE';
export const DISABLE_EDIT_MODE = 'map/DISABLE_EDIT_MODE';
export const SET_EDIT_MODE_MARKER = 'map/SET_EDIT_MODE_MARKER';

export function enableEditMode() {
  return dispatch => dispatch({
    type: ENABLE_EDIT_MODE
  });
}

export function disableEditMode() {
  return dispatch => dispatch({
    type: DISABLE_EDIT_MODE
  });
}

export function setEditModeMarker(position) {
  return dispatch => dispatch({
    type: SET_EDIT_MODE_MARKER,
    position
  });
}