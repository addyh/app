import * as types from '../actions/types';

const initialState = {
  id: {},
  profile: {},
  ageRange: {},
  typePreference: {}
};

export default function(state=initialState, action) {
  switch (action.type) {

    case types.FETCH_SETTINGS:
      return {
        id: action.payload.id,
        profile: action.payload.profile,
        ageRange: action.payload.ageRange,
        typePreference: action.payload.typePreference
      }

    case types.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload
      }

    case types.UPDATE_AGE_MIN:
      return {
        ...state,
        ageRange: {min: action.payload}
      }

    case types.UPDATE_AGE_MAX:
      return {
        ...state,
        ageRange: {max: action.payload}
      }

    default:
      return state;
  }
}