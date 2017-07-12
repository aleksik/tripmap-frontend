import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import places from './places';
import user from './user';
import map from './map';

export default combineReducers({
  routing: routerReducer,
  places,
  user,
  map
});