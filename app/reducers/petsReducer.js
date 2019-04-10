import * as types from '../actions/types';

const initialState = {
  allPets: [],   // All possible pets
  savedPets: [], // Just the ones they "liked"
};

export default function(state=initialState, action) {
  switch (action.type) {

    // Set the src property of a pet object in allPets
    // given index (payload.i) and path (payload.path)
    case types.SET_IMG_SRC:
      let allPets = [...state.allPets];
      allPets[action.payload.i].src = action.payload.path;
      return {
        ...state,
        allPets: allPets
      }

    // We are being given the allPets state for the first time
    case types.FETCH_ALL_PETS:
      return {
        ...state,
        allPets: action.payload
      }

    // Add a pet (action.payload) to savedPets (User "liked" one)
    case types.ADD_SAVED_PET:
      return {
        ...state,
        savedPets: [...state.savedPets, action.payload]
      }

    default:
      return state;
  }
}
