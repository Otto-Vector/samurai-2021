import {authAPI} from "../api/samurai-api";

const SET_AUTH = 'SET-AUTH'
const IS_FETCHING_SWICH_TO = 'IS-FETCHING-SWICH-TO'
const ON_ERROR_AUTH = 'ON-ERROR-AUTH'


let initialState = {
  data: {
    id: null,
    email: null,
    login: null
  },
  isFetching: false,
  isAuth: false,
  errorMessages: null,
  authURL: 'https://social-network.samuraijs.com',
}


const authReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_AUTH : {
      return {
        ...state,
        data: {
          id: action.payload.userId,
          email: action.payload.email,
          login: action.payload.login
        },
        isAuth: action.payload.isAuth
      }
    }
    case IS_FETCHING_SWICH_TO : {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case ON_ERROR_AUTH : {
      return {
        ...state,
        errorMessages: action.messages
      }
    }
    default : {
      // return {...state}
    }
  }

  return state
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_AUTH,
  payload: {userId, email, login, isAuth}
})
export const isFetchingSwichTo = (isFetching) => ({type: IS_FETCHING_SWICH_TO, isFetching})
export const onErrorAuth = (messages) => ({type: ON_ERROR_AUTH, messages})

export const getAuth = () =>
  async dispatch => {
    dispatch(isFetchingSwichTo(true))
    let response = await authAPI.getAuth()

    if (response.resultCode === 0) {
      let {id, login, email} = response.data
      dispatch(setAuthUserData(id, email, login, true))
    }
    dispatch(isFetchingSwichTo(false))

  }

export const loginIn = loginData =>
  async dispatch => {
    let response = await authAPI.loginIn(loginData)

    if (response.resultCode === 0) {
      dispatch(getAuth())
      dispatch(onErrorAuth(null))
    } else {
      dispatch(onErrorAuth(response.messages))
    }

  }

export const loginOut = () =>
  async dispatch => {
    let response = await authAPI.loginOut()

    if (response.resultCode === 0) {
      dispatch(onErrorAuth(null))
      dispatch(setAuthUserData(null, null, null, false))
    } else {
      dispatch(onErrorAuth(response.messages))
    }

  }

export default authReducer;
