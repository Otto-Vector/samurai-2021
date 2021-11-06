import {UsersAPI} from "../api/samurai-api";

const FOLLOW_TOGGLE = 'FOLLOW-TOGGLE'
const SET_USERS = 'SET-USERS'
const CHANGE_PAGE = 'CHANGE-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FETCHING_BY_ID = 'TOGGLE-IS-FETCHING-BY-ID'
const TOGGLE_FRIENDS_ONLY = 'TOGGLE-FRIENDS-ONLY'

let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFriendsFilter: null,
  isFetching: true,
  isFetchingById: [6]
}


let usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case FOLLOW_TOGGLE: {
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
    case SET_USERS: {
      return {
        ...state,
        users: action.users
      }
    }
    case CHANGE_PAGE: {
      return {
        ...state,
        currentPage: action.page
      }
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount
      }
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case TOGGLE_IS_FETCHING_BY_ID: {
      return {
        ...state,
        isFetchingById: action.isFetching
          ? [...state.isFetchingById, action.userId]
          : state.isFetchingById.filter(id => action.userId !== id)
      }
    }
    case TOGGLE_FRIENDS_ONLY: {
      return {
        ...state,
        isFriendsFilter: action.isFriendsFilter
      }
    }

    default: {
      return state
    }
  }

  // return state
}

export const followSuccessToggle = (userId, isFollow) => ({type: FOLLOW_TOGGLE, userId, isFollow})
export const setUsers = (users) => ({type: SET_USERS, users})
export const changePage = (page) => ({type: CHANGE_PAGE, page})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const isFetchingToggleId = (isFetching, userId) => ({type: TOGGLE_IS_FETCHING_BY_ID, isFetching, userId})
export const friendsOnlyToggle = (isFriendsFilter) => ({type: TOGGLE_FRIENDS_ONLY, isFriendsFilter})


export const getUsers = (pageSize, page, isFriendsFilter = null) =>
  async dispatch => {

    dispatch(toggleIsFetching(true))

    let response = await UsersAPI.getUsers(pageSize, page, isFriendsFilter)

    dispatch(setUsers(response.items))

    dispatch(setTotalUsersCount(response.totalCount))

    dispatch(toggleIsFetching(false))
  }


export const follow = (isFollow, userId) =>
  async dispatch => {
    dispatch(isFetchingToggleId(true, userId))

    let todo = !isFollow ? 'follow' : 'unfollow'

    let response = await UsersAPI[todo](userId)

    if (response.resultCode === 0) {
      dispatch(followSuccessToggle(userId, !isFollow))
    }

    dispatch(isFetchingToggleId(false, userId))

  }



export default usersReducer
