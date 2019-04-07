import * as types from '../actions/types';

const initialState = {
  count: 0
};

export default function(state=initialState, action) {
  switch (action.type) {

    case types.INCREASE:
      return {count: state.count+1}

    case types.DECREASE:
      return {count: state.count-1}

    default:
      return state;
  }
}