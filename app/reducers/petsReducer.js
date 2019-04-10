import * as types from '../actions/types';

const initialState = {
  allPets: [],
  savedPets: [],
};

export default function(state=initialState, action) {
  console.log(action.type);
  switch (action.type) {

    case types.SET_IMG_SRC:
      let allPets = [...state.allPets];
      allPets[action.payload.i].src = action.payload.path;
      return {
        ...state,
        allPets: allPets
      }

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