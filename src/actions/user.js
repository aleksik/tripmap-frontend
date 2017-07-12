export const LOGIN_REQUEST = 'user/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'user/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS';

const API = process.env.REACT_APP_API_URL;

function requestLogin() {
  return {
    type: LOGIN_REQUEST
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    message
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function login(credentials) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${credentials.username}&password=${credentials.password}`
  };

  return dispatch => {
    dispatch(requestLogin());
    return fetch(API + '/users/auth', config)
      .then(response => response.json())
      .then(({ token, user, success }) => {
        if (success === true) {
          localStorage.setItem('token', token);
          return dispatch(receiveLogin(user));
        } else {
          dispatch(loginError('Login failed'))
          return Promise.reject();
        }
      })
      .catch(err => console.log(err));
  }
}

export function logout() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    return dispatch(receiveLogout());
  }
}