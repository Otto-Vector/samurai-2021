import {authAPI, securityAPI} from "../api/samurai-api";
import {AuthDataType} from "./types/types";

const SET_AUTH = 'SET-AUTH'
const IS_FETCHING_SWICH_TO = 'IS-FETCHING-SWICH-TO'
const CAPTCHA_URL_SUCCESS = 'CAPTCHA_URL_SUCCESS'

let initialState = {
  data: {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null
  } as AuthDataType,
  isFetching: false,
  isAuth: false,
  authURL: 'https://social-network.samuraijs.com', // захардкодил ссылку в header логина
  captchaUrl: null as string | null,
}

export type AuthReducerStateType = typeof initialState
type ActionsType = setAuthUserDataType | isFetchingSwitchToType | captchaUrlSuccessType

const authReducer = (state = initialState, action: ActionsType): AuthReducerStateType    => {

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

type setAuthUserDataType =  { type: typeof SET_AUTH, payload: AuthDataType, isAuth: boolean}
export const setAuthUserData = (payload: AuthDataType, isAuth: boolean): setAuthUserDataType => ({
  type: SET_AUTH, payload, isAuth })

type isFetchingSwitchToType = {type: typeof IS_FETCHING_SWICH_TO, isFetching: boolean}
export const isFetchingSwitchTo = (isFetching:boolean): isFetchingSwitchToType => ({type: IS_FETCHING_SWICH_TO, isFetching})

type captchaUrlSuccessType = {type: typeof CAPTCHA_URL_SUCCESS, captchaUrl: string}
const captchaUrlSuccess = (captchaUrl: string): captchaUrlSuccessType => ({type: CAPTCHA_URL_SUCCESS, captchaUrl})

export const getAuth = () =>
  async (dispatch: Function) => {
    dispatch(isFetchingSwitchTo(true))
    let response = await authAPI.getAuth()

    if (response.resultCode === 0) {
      let {id, login, email} = response.data
      dispatch(setAuthUserData({id, email, login}, true))
    }
    dispatch(isFetchingSwitchTo(false))

  }

export const loginIn = (loginData : AuthDataType) =>
  async (dispatch: Function) => {
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
  async (dispatch: Function) => {
    let response = await authAPI.loginOut()

    if (response.resultCode === 0) {
      dispatch(setAuthUserData({id:null, email: null, login: null}, false))
    }

  }

export default authReducer;
