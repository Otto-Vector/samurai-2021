import {UsersAPI} from "../api/samurai-api";
import {UsersFromSearchType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_FRIENDS = "friends-reducer/ADD_FRIENDS"
const FRIENDS_IS_FETCHING = "friends-reducer/FRIENDS-IS-FETCHING"


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

export type FriendsReducerThunkActionType<R=void> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsType>

export const getResponseFriends = (): FriendsReducerThunkActionType =>
  async (dispatch) => {
    dispatch(friendsResponseIsFetching(true))
    const response = await UsersAPI.getUsers(100, 1, true)

    dispatch(addFriends(response.items))
    dispatch(friendsResponseIsFetching(false))
  }

export default friendsReducer
