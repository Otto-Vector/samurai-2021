import {authAPI, securityAPI} from "../api/samurai-api";

const SET_AUTH = 'SET-AUTH'
const IS_FETCHING_SWICH_TO = 'IS-FETCHING-SWICH-TO'
const CAPTCHA_URL_SUCCESS = 'CAPTCHA_URL_SUCCESS'

let initialState = {
  data: {
    id: null,
    email: null,
    login: null
  },
  isFetching: false,
  isAuth: false,
  authURL: 'https://social-network.samuraijs.com',
  captchaUrl: null,
}


const authReducer = (state = initialState, action) => {

  switch (action.type) {

    case SET_AUTH : {
      return {
        ...state,
        data: {...action.payload},
        isAuth: action.isAuth
      }
    }
    case IS_FETCHING_SWICH_TO : {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case CAPTCHA_URL_SUCCESS : {
      return {
        ...state,
        captchaUrl: action.captchaUrl
      }
    }
    default : {
      // return {...state}
    }
  }

  return state
}

export const setAuthUserData = (id, email, login, isAuth) => ({
  type: SET_AUTH,
  payload: {id, email, login},
  isAuth
})
export const isFetchingSwichTo = isFetching => ({type: IS_FETCHING_SWICH_TO, isFetching})
const captchaUrlSuccess = captchaUrl => ({type: CAPTCHA_URL_SUCCESS, captchaUrl})

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
    const response = await authAPI.loginIn(loginData)

    if (response.resultCode === 0) {
      dispatch(getAuth())
      return null
    } else if (response.resultCode === 10) {
      //десятый код запрашивает капчу и мы забираем её у сервера
      const response = await securityAPI.getCaptchaUrl()
      dispatch(captchaUrlSuccess(response.url))
    }
      return response.messages
  }

export const loginOut = () =>
  async dispatch => {
    let response = await authAPI.loginOut()

    if (response.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false))
    }

  }

export default authReducer;
