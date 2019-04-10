import * as types from './types';
import * as API from '../../API_CONFIG.json';

// Get settings.json from API and dispatch to Redux state
export const fetchSettings = () => dispatch => {
    fetch(API['settings.json'])
    .then(res => res.json())
    .then(res => ({
      id: res.id,
      profile: res.profile,
      ageRange: {min: res.ageRange.min,
                max: res.ageRange.max},
      typePreference: res.typePreference
    })).then(data => {
      dispatch({
        type: types.FETCH_SETTINGS,
        payload: data
      });
    }).catch(() => {
    let data = {
      "id": 2001,
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
  })
}

// Update a setting to the state

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

export const updateTypePreference = (pref) => dispatch => {
  dispatch({
    type: types.UPDATE_TYPE_PREFERENCE,
    payload: pref
  });
}