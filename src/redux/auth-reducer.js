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
  isFetching: true,
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

export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_AUTH, payload: {userId, email, login, isAuth}})
export const isFetchingSwichTo = (isFetching) => ({type: IS_FETCHING_SWICH_TO, isFetching})
export const onErrorAuth = (messages) => ({type: ON_ERROR_AUTH, messages})

export const getAuth = () => {
  return dispatch => {
    dispatch(isFetchingSwichTo(true))
    authAPI.getAuth()
      .then(response => {
        if (response.resultCode === 0) {
          let {id, login, email} = response.data
          dispatch(setAuthUserData(id, email, login, true))
          dispatch(isFetchingSwichTo(false))
        }
      })
  }
}

// export const loginIn = (loginData) => {
export const loginIn = (loginData) => {

  return dispatch => {
    authAPI.loginIn(loginData)
      .then(response => {
        if (response.resultCode === 0) {
          dispatch(getAuth())
          // dispatch(onErrorAuth(response.messages))
          dispatch(onErrorAuth(null))
        } else {
          dispatch(onErrorAuth(response.messages))
        }
      })
  }
}

export const loginOut = () => {
  return dispatch => {
    authAPI.loginOut()
      .then(response => {
        if (response.resultCode === 0) {
          dispatch(onErrorAuth(null))
          dispatch(setAuthUserData(null, null, null, false))
        } else {
          dispatch(onErrorAuth(response.messages))
        }
      })
  }
}

export default authReducer;
