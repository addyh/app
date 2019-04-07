import * as types from './types';

export const increaseCounter = () => dispatch => {
  dispatch({type:types.INCREASE});
}

export const decreaseCounter = () => dispatch => {
  dispatch({type:types.DECREASE});
}