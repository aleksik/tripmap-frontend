export const REQUEST_PLACES = 'places/REQUEST_PLACES';
export const SET_PLACES = 'places/SET_PLACES';

export const getPlaces = ()  => {
  return dispatch => {
    dispatch({
      type: REQUEST_PLACES
    });

    return fetch('http://localhost:9000/places')
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