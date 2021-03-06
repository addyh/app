import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import * as types from './types';
import * as API from '../../API_CONFIG.json';

// Save image locally and dispatch an action to update its src in pets object of redux state
const saveImage = (i, img, dispatch) => {
  RNFetchBlob.config({
    fileCache: true,
    path : RNFetchBlob.fs.dirs.DocumentDir + '/'+ img.split('/').pop()
  })
  .fetch('GET', img)
  .then((res) => {
    let path = Platform.OS === 'android' ? 'file://' + res.path() : '' + res.path();
    dispatch({
      type: types.SET_IMG_SRC,
      payload: {i, path}
    });
  })
}

// Go through every pet in pets.json
// and take note of their src and index for saveImage()
const fetchImages = (pets, dispatch) => {
  for (let i in pets) {
    saveImage(i, pets[i].img, dispatch);
  }
}

// Get pets.json from API and dispatch to redux state
export const fetchPets = () => dispatch => {
    fetch(API['pets.json'])
    .then(res => res.json())
    .then(pets => {
      // Do some image preloading concurrently
      fetchImages(pets, dispatch);
      dispatch({
        type: types.FETCH_ALL_PETS,
        payload: pets
      });
    }).catch(() => {
    // Backup of pets.json incase network fails
    let data = [
      {
        "id": 2001,
        "type": "cat",
        "name": "Patronus",
        "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/patronus.jpg",
        "sex": "M",
        "age": 8,
        "profile": "Patronus is a super chatty cat! He loves to be up high on a shelf or cuddling on the couch. He is a Hemmingway (polydactyl) so he does need a little extra care with nail clipping. He has a beautiful red/brown coat and is on a strict wet food diet."
      },
      {
        "id": 1002,
        "type": "dog",
        "name": "Riley",
        "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/riley.jpg",
        "sex": "M",
        "age": 5,
        "profile": "Despite being 40lbs Riley is a total lap dog and loves to cuddle. He is a Brittany with a lot of energy. He loves running, hiking, camping etc. He is also nose trained and can sniff out just about anything. Never been hunting but his prey instinct is very strong, prob wont be an off-leash dog."
      },
      {
        "id": 1003,
        "type": "cat",
        "name": "Julius",
        "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/julius.JPG",
        "sex": "M",
        "age": 3,
        "profile": "Julius is a beautiful orange tabby. He loves laying in the sun and can usually be found hear a window slowly moving throughout the day to stay in the suns beams. Nothing makes him happier than chasing a bit of string across the floor or running up a wall after a laser pointer"
      },
      {
        "id": 1004,
        "type": "dog",
        "name": "Jack",
        "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/jack.jpg",
        "sex": "M",
        "age": 5,
        "profile": "Hiking dog with a penchant for cheese, this formerly rescued dog is happy to follow you on the trail or cuddle on the couch. Loves to chase squirrels and fetch balls and gets along with cats. He prefers not to house with small children or other dogs."
      },
      {
        "id": 1005,
        "type": "cat",
        "name": "Gravy",
        "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/gravy.jpg",
        "sex": "F",
        "age": 5,
        "profile": "Feline conversationalist with a carb addiction seeks talkative housemates to snuggle and sneak her croissants. Good with cat-friendly dogs, but domineering with other cats. Tolerant of well behaved children."
      },
      {
        "id": 1006,
        "type": "dog",
        "name": "Cola",
        "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/cola.jpg",
        "sex": "F",
        "age": 11,
        "profile": "I'm a low-key, even-tempered couch potato who enjoys short walks when it isn't raining, chasing the laser pointer, tattling on the cats, and getting the last bits of yogurt out of an empty container. You would never know I'm considered a senior citizen! I can navigate stairs, but I appreciate a little help getting on and off the couch."
      },
      {
        "id": 1007,
        "type": "cat",
        "name": "Rogue",
        "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/rogue.jpg",
        "sex": "M",
        "age": 7,
        "profile": "Laziest cat on the planet. He will claim all boxes and baskets in your house as his own. Fluffy and cuddly, but only you bribe hime with cat-treats. Indoor cat only, he refuses to go outside. Refuses to drink water unless served in a teacup."
      },
      {
        "id": 1008,
        "type": "cat",
        "name": "Pandemonium",
        "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/pandemonium.jpg",
        "sex": "M",
        "age": 17,
        "profile": "Geriatric and proud of it. He is very attention-seeking and needs a home that is ready for a cat that likes to be treated like a dog. He won't fetch, but will climb onto your lap (or anyone's lap for that matter) the minute you sit down.  Pet him or suffer the meows. He's needs meds for arthritis."
      },
      {
        "id": 1009,
        "type": "cat",
        "name": "Loki",
        "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/loki.jpg",
        "sex": "M",
        "age": 11,
        "profile": "This cat is a mouser and an alpha. If you have a field, he will be happiest outside during the day, catching all the scurrying things. Gets along with other cats and most dogs, as long as they admit that he is the king of the pride. You can try to adopt him, but really he's the one deciding if you're the one for him."
      },
      {
        "id": 1010,
        "type": "dog",
        "name": "Cricket",
        "img": "https://s3-us-west-2.amazonaws.com/cozi-interview-dev/cricket.jpeg",
        "sex": "F",
        "age": 12,
        "profile": "A sweet old lady, but a total butthead when she wants to be. Trained enough to know better, but rarely acts on her training. Not very good with little kids, big kids, or other animals. Very demanding of belly rubs. Just kidding, not for adoption."
      }
    ];
    dispatch({
      type: types.FETCH_ALL_PETS,
      payload: data
    });
  });
}

// Add a pet to savedPets (User "liked" one)
export const addSavedPet = (pet) => dispatch => {
  dispatch({
    type: types.ADD_SAVED_PET,
    payload: pet
  });
}