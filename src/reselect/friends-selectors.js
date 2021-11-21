import {randomDifferentIntegersArrayCreator} from "../utils/utils";
import {createSelector} from "reselect";

export const getFriendsHeader = state => state.sidebar.header
export const getFriendsIsFetching = state => state.sidebar.isFetching

const getFriends = state => state.sidebar.friends
const getFriendsToShow = state => state.sidebar.friendsToShow

export const getAnyFriendsReselect = createSelector(getFriends, getFriendsToShow, (friends, friendsToShow) => {
  let maxFriends = friends.length
  let toShow = Math.min(maxFriends, friendsToShow)

  return randomDifferentIntegersArrayCreator(maxFriends)(toShow).map(index => friends[index])
})
