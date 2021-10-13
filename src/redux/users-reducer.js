const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET-USERS'
const CHANGE_PAGE = 'CHANGE-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const TOGGLE_IS_FETCHING_BY_ID = 'TOGGLE-IS-FETCHING-BY-ID'

let initialState = {
  users: [],
  pageSize: 6,
  totalUsersCount: 0,
  currentPage: 1,
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
    default: {
      return state
    }
  }

  // return state
}

export const follow = (userId) => ({type: FOLLOW, userId})
export const unfollow = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const changePage = (page) => ({type: CHANGE_PAGE, page})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const isFetchingToggleId = (isFetching, userId) => ({type: TOGGLE_IS_FETCHING_BY_ID, isFetching, userId})

export default usersReducer
