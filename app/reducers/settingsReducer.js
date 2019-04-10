import * as types from '../actions/types';

const initialState = {
  id: {},
  profile: {},
  ageRange: {},
  typePreference: {}
};

export default function(state=initialState, action) {
  console.log(action.type)
  switch (action.type) {

    case types.FETCH_SETTINGS:
      return {
        ...state,
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