import {ResultCodesEnum, UsersAPI} from "../api/samurai-api";
import {UsersFromSearchType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, GetActionsTypes} from "./redux-store";


const initialState = {
  users: [] as UsersFromSearchType[],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFriendsFilter: null as boolean | null, // здесь используется именно null в запросах api, чтобы не фильтровать друзей
  // итого три состояния null - все, true - только друзья, false - все кроме друзей
  isFetching: true,
  isFetchingById: [6]
}

export type UsersReducerStateType = typeof initialState

type ActionsType = GetActionsTypes<typeof usersActions>

const usersReducer = (state = initialState, action: ActionsType): UsersReducerStateType => {

  switch (action.type) {
    case 'users-reducer/FOLLOW-TOGGLE': {
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: action.isFollow}
          }
          return u
        })
      }
    }
    case "users-reducer/SET-USERS": {
      return {
        ...state,
        users: action.users
      }
    }
    case "users-reducer/CHANGE-PAGE": {
      return {
        ...state,
        currentPage: action.page
      }
    }
    case "users-reducer/SET-TOTAL-USERS-COUNT": {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount
      }
    }
    case "users-reducer/TOGGLE-IS-FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }

    case "users-reducer/TOGGLE-FRIENDS-ONLY": {
      return {
        ...state,
        isFriendsFilter: action.isFriendsFilter
      }
    }
    case "users-reducer/TOGGLE-IS-FETCHING-BY-ID": {
      return {
        ...state,
        isFetchingById: action.isFetching
          ? [...state.isFetchingById, action.userId]
          : state.isFetchingById.filter(id => action.userId !== id)
      }
    }
    default: {
      return state
    }
  }

}

/* ЭКШОНЫ USERS */

export const usersActions = {
  // добавление|удаление пользователя в список друзей
  followSuccessToggle: (userId: number, isFollow: boolean) => ({
    type: 'users-reducer/FOLLOW-TOGGLE',
    userId,
    isFollow
  } as const),
  // установка значения в карточки пользователей одной страницы
  setUsers: (users: UsersFromSearchType[]) => ({
    type: 'users-reducer/SET-USERS',
    users
  } as const),
  // установке значения активной страницы
  // возвращаемого из API поиска
  changePage: (page: number) => ({type: 'users-reducer/CHANGE-PAGE', page} as const),
  // записывает общее количество найденных пользователей
  // (для подсчёта в пагинаторе)
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'users-reducer/SET-TOTAL-USERS-COUNT',
    totalUsersCount
  } as const),
  // ожидание отклика API на запрос поиска пользователей
  toggleIsFetching: (isFetching: boolean) => ({
    type: 'users-reducer/TOGGLE-IS-FETCHING',
    isFetching
  } as const),
  // ожидание отклика API при нажании follow/unfollow
  isFetchingToggleId: (isFetching: boolean, userId: number) => ({
    type: 'users-reducer/TOGGLE-IS-FETCHING-BY-ID',
    isFetching,
    userId
  } as const),
  // поиск только среди друзей
  friendsOnlyToggle: (isFriendsFilter: boolean | null) => ({
    type: 'users-reducer/TOGGLE-FRIENDS-ONLY',
    isFriendsFilter
  } as const),
}

/* САНКИ */

export type UsersReducerThunkActionType<R = void> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsType>
// запрос на API и запись в стейт значений поиска пользователей
export const getUsers = (pageSize: number, page: number, isFriendsFilter = null as boolean | null): UsersReducerThunkActionType =>
  async (dispatch) => {

    dispatch(usersActions.toggleIsFetching(true))

    const response = await UsersAPI.getUsers(pageSize, page, isFriendsFilter)

    dispatch(usersActions.setUsers(response.items))

    dispatch(usersActions.setTotalUsersCount(response.totalCount))

    dispatch(usersActions.toggleIsFetching(false))
  }

// подписка или отписка от друзей через запрос API
export const follow = (isFollow: boolean, userId: number): UsersReducerThunkActionType =>
  async (dispatch) => {
    dispatch(usersActions.isFetchingToggleId(true, userId))

    const response = await UsersAPI[!isFollow ? 'follow' : 'unfollow'](userId)

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(usersActions.followSuccessToggle(userId, !isFollow))
    }

    dispatch(usersActions.isFetchingToggleId(false, userId))

  }


export default usersReducer
