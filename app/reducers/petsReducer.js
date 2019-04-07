import * as types from '../actions/types';

const initialState = {
  allPets: []
};

export default function(state=initialState, action) {
  switch (action.type) {

    case types.FETCH_ALL_PETS:
      return {
        ...state,
        allPets: action.payload
      }

    default:
      return state;
  }
}