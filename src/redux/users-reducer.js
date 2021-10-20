import {UsersAPI} from "../api/samurai-api";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const CHANGE_PAGE = 'CHANGE-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FETCHING_BY_ID = 'TOGGLE-IS-FETCHING-BY-ID'
const TOGGLE_FRIENDS_ONLY = 'TOGGLE-FRIENDS-ONLY'

let initialState = {
  users: [],
  pageSize: 6,
  totalUsersCount: 0,
  currentPage: 1,
  isFriendsFilter: null,
  isFetching: true,
  isFetchingById: [6]
}


let usersReducer = (state = initialState, action) => {

  let functions = {
    fullowUser(id, bool = true) {
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === id) {
            return {...u, followed: bool}
          }
          return u
        })
      }
    },

    unfullowUser(id) {
      return functions.fullowUser(id, false)
    },

    setUsers(users) {
      return {
        ...state,
        users
      }
    },

    changePage(currentPage) {
      return {
        ...state,
        currentPage
      }
    },

    setTotalUsersCount(totalUsersCount) {
      return {
        ...state,
        totalUsersCount
      }
    },

    toggleIsFetching(isFetching) {
      return {
        ...state,
        isFetching
      }
    },

    isFetchingToggleId(isFetching, userId) {
      return {
        ...state,
        isFetchingById: isFetching
          ? [...state.isFetchingById, userId]
          : state.isFetchingById.filter(id => userId !== id)
      }
    },
    friendsOnlyToggle() {
      let isFriendsFilter = state.isFriendsFilter ? null : true
      console.log(isFriendsFilter)
      return {
        ...state,
        isFriendsFilter
      }
    }
  }


  switch (action.type) {
    case FOLLOW:
      return functions.fullowUser(action.userId)
    case UNFOLLOW:
      return functions.unfullowUser(action.userId)
    case SET_USERS:
      return functions.setUsers(action.users)
    case CHANGE_PAGE:
      return functions.changePage(action.page)
    case SET_TOTAL_USERS_COUNT:
      return functions.setTotalUsersCount(action.totalUsersCount)
    case TOGGLE_IS_FETCHING:
      return functions.toggleIsFetching(action.isFetching)
    case TOGGLE_IS_FETCHING_BY_ID:
      return functions.isFetchingToggleId(action.isFetching, action.userId)
    case TOGGLE_FRIENDS_ONLY:
      return functions.friendsOnlyToggle()
    default: {
      return state
    }
  }

  // return state
}

export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const changePage = (page) => ({type: CHANGE_PAGE, page})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const isFetchingToggleId = (isFetching, userId) => ({type: TOGGLE_IS_FETCHING_BY_ID, isFetching, userId})
export const friendsOnlyToggle = () => ({type: TOGGLE_FRIENDS_ONLY})

export const getUsers = (pageSize, page, isFriendsFilter= null) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true))

    UsersAPI.getUsers(pageSize, page, isFriendsFilter)
      .then(response => {
        dispatch(setUsers(response.items))

        dispatch(setTotalUsersCount(response.totalCount))

        dispatch(toggleIsFetching(false))
      })
  }
}

export const follow = (isFollow, userId) => {
  if (!isFollow)
    return (dispatch) => {
      dispatch(isFetchingToggleId(true, userId))
      UsersAPI.follow(userId)
        .then(response => {
          if (response.resultCode === 0) {
            dispatch(followSuccess(userId))
          }
          dispatch(isFetchingToggleId(false, userId))
        })
    }
  else
    return (dispatch) => {
      dispatch(isFetchingToggleId(true, userId))
      UsersAPI.unfollow(userId)
        .then(response => {
          if (response.resultCode === 0) {
            dispatch(unfollowSuccess(userId))
          }
          dispatch(isFetchingToggleId(false, userId))
        })
    }
}


export default usersReducer
