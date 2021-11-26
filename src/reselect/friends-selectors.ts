import {randomDifferentIntegersArrayCreator} from "../utils/utils";
import {createSelector} from "reselect";
import {AppStateType} from "../redux/redux-store";
import {FriendsReducerStateType} from "../redux/friends-reducer";

type AppStateReturned<T> = (state: AppStateType) => T

export const getFriendsHeader: AppStateReturned<FriendsReducerStateType['header']> = (state) => state.sidebar.header
export const getFriendsIsFetching: AppStateReturned<FriendsReducerStateType['isFetching']> = (state) => state.sidebar.isFetching

const getFriends: AppStateReturned<FriendsReducerStateType['friends']> = (state) => state.sidebar.friends
const getFriendsToShow: AppStateReturned<FriendsReducerStateType['friendsToShow']> = (state) => state.sidebar.friendsToShow

export const getAnyFriendsReselect = createSelector(getFriends, getFriendsToShow, (friends, friendsToShow) => {
  let maxFriends = friends.length
  let toShow = Math.min(maxFriends, friendsToShow)

  return randomDifferentIntegersArrayCreator(maxFriends)(toShow).map(index => friends[index])
})
