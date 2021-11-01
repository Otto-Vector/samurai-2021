// import {randomFaceImage} from "../api/randomFace"
import {UsersAPI} from "../api/samurai-api";

const REFRESH_FRIENDS = "REFRESH-FRIENDS"
const ADD_FRIENDS = "ADD_FRIENDS"

let initialState = {
  friends: [],
  header: 'Friends',
}

const friendsReducer = (state = initialState, action) => {


  switch (action.type) {

    case REFRESH_FRIENDS : {

      return {
        ...state,
        friends: [state.friends.reverse()]
      }
    }
    case ADD_FRIENDS : {
      return {
        ...state,
        friends: action.friends
      }
    }
    default : {
      return {...state}
    }
  }
  // return {...state}
}

export const refreshFriends = () => ({type: REFRESH_FRIENDS})
const addFriends = friends => ({type: ADD_FRIENDS, friends})

export const getResponseFriends = () => dispatch => {
  return UsersAPI.getUsers(100, 1, true)
    .then( response => {
      dispatch(addFriends(response.items))
    })
}

export default friendsReducer;
