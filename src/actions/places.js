import { handleResponseErrors } from '../utils';

export const PLACES_REQUEST = 'places/PLACES_REQUEST';
export const PLACES_SUCCESS = 'places/PLACES_SUCCESS';

export const SET_PLACES = 'places/SET_PLACES';

export const CREATE_REQUEST = 'places/CREATE_REQUEST';
export const CREATE_SUCCESS = 'places/CREATE_SUCCESS';
export const CREATE_FAILURE = 'places/CREATE_FAILURE';

const API = process.env.REACT_APP_API_URL;

function requestPlaces() {
  return {
    type: PLACES_REQUEST
  }
}

function receivePlaces(places) {
  return {
    type: PLACES_SUCCESS,
    places
  }
}

function requestCreate() {
  return {
    type: CREATE_REQUEST
  }
}

function receiveCreate(place) {
  return {
    type: CREATE_SUCCESS,
    place
  }
}

function createError(createErrors) {
  return {
    type: CREATE_FAILURE,
    createErrors
  }
}

export const getPlaces = ()  => {
  return dispatch => {
    dispatch(requestPlaces());

    return fetch(API + '/places')
      .then(response => handleResponseErrors(response))
      .then(response => response.json())
      .then(places => dispatch(receivePlaces(places)))
      .catch(error => console.error(error));
  }
}

export const createPlace = place => {

  const config = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(place)
  };

  return dispatch => {

    dispatch(requestCreate());

    return fetch(API + '/places', config)

      // Handle errors
      .then(response => {
        if (!response.ok) {
          return response.json()
            .then(({ errors }) => {
              dispatch(createError(errors));
              throw Error(response.statusText);
            });
        }
        return response.json();
      })

      // Success
      .then(({ place }) => dispatch(receiveCreate(place)))

      .catch(e => Promise.reject(e.message));
  }
}