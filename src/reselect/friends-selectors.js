import {randArrayDiffInt} from "../utils/utils";
import {createSelector} from "reselect";

export const getFriendsHeader = (state) => {
  return state.sidebar.header
}

const getFriends = (state) => {
  return state.sidebar.friends
}

export const getThreeFriends = (state) => {
  console.log("обращение к селектору другов")
  let friends = getFriends(state)
  let maxUsers = friends.length - 1
  let maxDiffArray = randArrayDiffInt(maxUsers)
  let diffArray = maxDiffArray(Math.min(maxUsers,6))

  return diffArray.map(el => friends[el])
}


export const getThreeFriendsRe = createSelector( getFriends, (friends)=> {
  let maxUsers = friends.length - 1
  let diffArray = randArrayDiffInt(maxUsers)(Math.min(maxUsers,6))

  return diffArray.map(el => friends[el])
})
