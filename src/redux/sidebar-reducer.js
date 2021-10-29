import {randomFaceImage} from "../api/randomFace"

const ON_CLICK_FRIENDS = "ON-CLICK-FRIENDS"

let initialState = {
      friends: [
        {
          id: 32,
          imageURL: randomFaceImage(),
          name : 'Alex',
        },
        {
          id: 33,
          imageURL: randomFaceImage(),
          name : 'Max',
        },
        {
          id: 38,
          imageURL: randomFaceImage(),
          name : 'Aton',
        },
      ],
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
    default : { return {...state} }
  }
  return {...state}
}

export let onClickFriends = id => ({type: ON_CLICK_FRIENDS, id})



export default sidebarReducer;
