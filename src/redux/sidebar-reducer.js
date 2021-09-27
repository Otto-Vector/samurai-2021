import {friends, header} from "./sidebar";

const ON_CLICK_FRIENDS = "ON-CLICK-FRIENDS"

let initialState = {
      friends: friends,
      header: header,
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
    default : { return {...state} }
  }
  return {...state}
}

export let onClickFriendsActionCreator = id => ({type: ON_CLICK_FRIENDS, id})

export default sidebarReducer;
