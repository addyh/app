import * as types from '../actions/types';

// All user settings from settings.json
const initialState = {
  id: {},       // integer
  profile: {},  // string
  ageRange: {}, // {min: integer, max: integer}
  typePreference: {} // dog or cat
};

export default function(state=initialState, action) {
  switch (action.type) {

    // We are being given the data from settings.json
    case types.FETCH_SETTINGS:
      return {
        ...state,
        id: action.payload.id,
        profile: action.payload.profile,
        ageRange: action.payload.ageRange,
        typePreference: action.payload.typePreference
      }

    // Being given a setting to update :
    
    case types.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload
      }

    case types.UPDATE_AGE_MIN:
      return {
        ...state,
        ageRange: {...state.ageRange, min: action.payload}
      }

    case types.UPDATE_AGE_MAX:
      return {
        ...state,
        ageRange: {...state.ageRange, max: action.payload}
      }

    case types.UPDATE_TYPE_PREFERENCE:
      return {
        ...state,
        typePreference: action.payload
      }

    default:
      return state;
  }
}