import {randArrayDiffInt} from "../utils/utils";
import {createSelector} from "reselect";

export const getFriendsHeader = (state) => {
  return state.sidebar.header
}

const getFriends = (state) => {
  return state.sidebar.friends
}

export const getFriendsIsFetching = (state) => {
  return state.sidebar.isFetching
}

const getFriendsToShow = (state) => {
  return state.sidebar.friendsToShow
}

export const getThreeFriendsRe = createSelector( getFriends, getFriendsToShow, (friends, toShow)=> {
  let maxUsers = friends.length - 1
  let diffArray = randArrayDiffInt(maxUsers)(Math.min(maxUsers,toShow))

  return diffArray.map(el => friends[el])
})
