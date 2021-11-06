import {UsersAPI} from "../api/samurai-api";

const ADD_FRIENDS = "ADD_FRIENDS"
const FRIENDS_IS_FETCHING = "FRIENDS-IS-FETCHING"

let initialState = {
  friends: [],
  header: 'Friends',
  friendsToShow: 20,
  isFetching: true
}

const friendsReducer = (state = initialState, action) => {


  switch (action.type) {

    case ADD_FRIENDS : {
      return {
        ...state,
        friends: action.friends
      }
    }

    case  FRIENDS_IS_FETCHING : {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    default : {
      return {...state}
    }
  }
  // return {...state}
}

const addFriends = friends => ({type: ADD_FRIENDS, friends})
const friendsResponseIsFetching = isFetching => ({type: FRIENDS_IS_FETCHING, isFetching})

export const getResponseFriends = () =>
  async dispatch => {
    dispatch(friendsResponseIsFetching(true))
    const response = await UsersAPI.getUsers(100, 1, true)
    dispatch(addFriends(response.items))
    dispatch(friendsResponseIsFetching(false))
  }

export default friendsReducer;
