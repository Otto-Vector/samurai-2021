import {randomDifferentIntegersArrayCreator} from "../utils/utils";
import {createSelector} from "reselect";

export const getFriendsHeader = state => state.sidebar.header
export const getFriendsIsFetching = state => state.sidebar.isFetching

const getFriends = state => state.sidebar.friends
const getFriendsToShow = state => state.sidebar.friendsToShow

export const getAnyFriendsReselect = createSelector( getFriends, getFriendsToShow, (friends, friendsToShow) => {
  let maxUsers = friends.length - 1
  let diffArray = randomDifferentIntegersArrayCreator(maxUsers)(Math.min(maxUsers,friendsToShow))

  return diffArray.map(index => friends[index])
})
