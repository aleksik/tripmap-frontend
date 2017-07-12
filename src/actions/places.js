export const REQUEST_PLACES = 'places/REQUEST_PLACES';
export const SET_PLACES = 'places/SET_PLACES';

const API = process.env.REACT_APP_API_URL;

export const getPlaces = ()  => {
  return dispatch => {
    dispatch({
      type: REQUEST_PLACES
    });

    return fetch(API + '/places')
      .then(response => response.json())
      .then(places => {
        dispatch({
          type: SET_PLACES,
          places
        })
      })
      .catch(error => console.error(error));
  }
}