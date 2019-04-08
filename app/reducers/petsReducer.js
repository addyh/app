import * as types from '../actions/types';

const initialState = {
  allPets: [],
  savedPets: [],
};

export default function(state=initialState, action) {
  switch (action.type) {

    case types.FETCH_ALL_PETS:
      return {
        ...state,
        allPets: action.payload
      }

    case types.ADD_SAVED_PET:
      return {
        ...state,
        savedPets: [...state.savedPets, action.payload]
      }

    default:
      return state;
  }
}