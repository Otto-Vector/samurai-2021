// import {randomFaceImage} from "../api/randomFace"
import {UsersAPI} from "../api/samurai-api";

const ON_CLICK_FRIENDS = "ON-CLICK-FRIENDS"
const ADD_FRIENDS = "ADD_FRIENDS"

let initialState = {
  friends: [],
  header: 'Friends',
}

const sidebarReducer = (state = initialState, action) => {

  let sidebarFunctions = {

    onClickFriends(id) {
      console.log('Friend id: ', id)
    }
  }

  switch (action.type) {

    case ON_CLICK_FRIENDS : {
      sidebarFunctions.onClickFriends(action.id)
      break
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
  return {...state}
}

export const onClickFriends = id => ({type: ON_CLICK_FRIENDS, id})
const addFriends = friends => ({type: ADD_FRIENDS, friends})
let randMinMax = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const getFriends = () => dispatch => {
  return UsersAPI.getUsers(100, 1, true)
    .then( response => {
      let maxUsers = response.items.length - 1
      let friends = []
      for (let i = 0; i < (maxUsers < 3 ? maxUsers : 3); i++) {
        friends = [...friends, response.items[randMinMax(0, maxUsers)]]
      }
      dispatch(addFriends(friends))
    })
}

export default sidebarReducer;
