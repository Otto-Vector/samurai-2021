import {UsersFromSearchType} from "./types/types"
import {ThunkAction} from "redux-thunk"
import { AppStateType, GetActionsTypes} from "./redux-store"
import {usersApi} from "../api/users-api";

const initialState = {
  friends: [] as UsersFromSearchType[],
  header: 'Friends',
  friendsToShow: 16,
  isFetching: true
}

export type FriendsReducerStateType = typeof initialState
type ActionsType = GetActionsTypes<typeof friendsActions>

const friendsReducer = (state = initialState, action: ActionsType): FriendsReducerStateType => {

  switch (action.type) {

    case "friends-reducer/ADD_FRIENDS" : {
      return {
        ...state,
        friends: action.friends
      }
    }
    case "friends-reducer/FRIENDS-IS-FETCHING" : {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    default : {
      return state
    }
  }
}

/* ЭКШОНЫ ДЛЯ ДРУЗЕЙ */
export const friendsActions = {
  // добавляет массив данных друзей
  addFriends: (friends: UsersFromSearchType[]) => ({
    type: "friends-reducer/ADD_FRIENDS",
    friends
  } as const),
  // изменяет переменную отображения загрузки данных
  friendsResponseIsFetching: (isFetching: boolean) => ({
    type: "friends-reducer/FRIENDS-IS-FETCHING",
    isFetching
  } as const),
}

/* САНКИ */

export type FriendsReducerThunkActionType<R = void> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsType>

export const getResponseFriends = (): FriendsReducerThunkActionType =>
  async (dispatch) => {
    dispatch(friendsActions.friendsResponseIsFetching(true))
    const response = await usersApi.getUsers(100, 1, true)
    dispatch(friendsActions.addFriends(response.items))
    dispatch(friendsActions.friendsResponseIsFetching(false))
  }

export default friendsReducer
