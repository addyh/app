import {combineReducers} from 'redux';
import petsReducer from './petsReducer';
import settingsReducer from './settingsReducer';

export default combineReducers({
  pets: petsReducer,
  settings: settingsReducer,
});