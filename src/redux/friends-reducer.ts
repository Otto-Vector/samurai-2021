import {UsersAPI} from "../api/samurai-api";
import {UsersFromSearchType} from "./types/types";

const ADD_FRIENDS = "ADD_FRIENDS"
const FRIENDS_IS_FETCHING = "FRIENDS-IS-FETCHING"


let initialState = {
  friends: [] as UsersFromSearchType[],
  header: 'Friends',
  friendsToShow: 16,
  isFetching: true
}

export type FriendsReducerStateType = typeof initialState
type ActionsType = AddFriendsActionType | FriendsResponseIsFetchingActionType

const friendsReducer = (state = initialState, action: ActionsType): FriendsReducerStateType => {

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

type AddFriendsActionType = {
  type: typeof ADD_FRIENDS
  friends: UsersFromSearchType[]
}
const addFriends = (friends: UsersFromSearchType[]): AddFriendsActionType => ({type: ADD_FRIENDS, friends})

type FriendsResponseIsFetchingActionType = {
  type: typeof FRIENDS_IS_FETCHING
  isFetching: boolean
}
const friendsResponseIsFetching = (isFetching: boolean): FriendsResponseIsFetchingActionType => ({type: FRIENDS_IS_FETCHING, isFetching})

export const getResponseFriends = () =>
  async (dispatch: Function) => {
    dispatch(friendsResponseIsFetching(true))
    const response = await UsersAPI.getUsers(100, 1, true)
    dispatch(addFriends(response.items))
    dispatch(friendsResponseIsFetching(false))
  }

export default friendsReducer
