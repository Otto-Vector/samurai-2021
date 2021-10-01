import {users} from "./allUsersData";

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const CHANGE_PAGE = 'CHANGE-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'

let initialState = users

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

    changePage(page) {
      return {
        ...state,
        currentPage: page
      }
    },

    setTotalUsersCount(totalUsersCount) {
      return {
        ...state,
        totalUsersCount
      }
    }
  }


  switch (action.type) {
    case FOLLOW:
      return functions.fullowUser(action.userId)
    case UNFOLLOW:
      return functions.unfullowUser(action.userId)
    case SET_USERS:
      return {
        ...state,
        users: action.users
      }
    case CHANGE_PAGE:
      return functions.changePage(action.page)
    case SET_TOTAL_USERS_COUNT:
      return functions.setTotalUsersCount(action.totalUsersCount)

    default: {
      return state
    }
  }

  // return state
}

export const followActionCreator = (userId) => ({type: FOLLOW, userId})
export const unfollowActionCreator = (userId) => ({type: UNFOLLOW, userId})
export const setUsersActionCreator = (users) => ({type: SET_USERS, users})
export const changePageActionCreator = (page) => ({type: CHANGE_PAGE, page})
export const setTotalUsersCountActionCreator = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount })

export default usersReducer
