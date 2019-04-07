import * as types from './types';

export const fetchSettings = () => dispatch => {
  if (0) {
    fetch('https://s3-us-west-2.amazonaws.com/cozi-interview-dev/settings.json')
    .then(res => res.json())
    .then(res => ({
      id: res.id,
      profile: res.profile,
      ageRange: {min: res.ageRange.min.toString(),
                max: res.ageRange.max.toString()},
      typePreference: res.typePreference
    })).then(data => {
      dispatch({
        type: types.FETCH_SETTINGS,
        payload: data
      });
    });
  }
  else {
    let data = {
      "id": 1002,
      "profile": "I love all animals! I live in a nice big house on an acre of land, the pets will have plenty of room to run around and have fun. I work from home too so I will always be available to them. I grew up on a farm and have a great deal of experience working with animals.",
      "typePreference": "cat",
      "ageRange": {
        "min": 0,
        "max": 20
      }
    };
    dispatch({
      type: types.FETCH_SETTINGS,
      payload: data
    });
  }
};

export const updateProfile = (profile) => dispatch => {
  dispatch({
    type: types.UPDATE_PROFILE,
    payload: profile
  });
}

export const updateAgeMin = (age) => dispatch => {
  dispatch({
    type: types.UPDATE_AGE_MIN,
    payload: age
  });
}

export const updateAgeMax = (age) => dispatch => {
  dispatch({
    type: types.UPDATE_AGE_MAX,
    payload: age
  });
}