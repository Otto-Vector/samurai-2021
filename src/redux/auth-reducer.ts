import {authAPI, securityAPI} from "../api/samurai-api";
import {AuthDataType, LoginDataType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_AUTH = 'auth-reducer/SET-AUTH'
const IS_FETCHING_SWICH_TO = 'auth-reducer/IS-FETCHING-SWICH-TO'
const CAPTCHA_URL_SUCCESS = 'auth-reducer/CAPTCHA_URL_SUCCESS'
const SET_AUTH_ERRORS_FROM_API = 'auth-reducer/SET_AUTH_ERRORS_FROM_API'

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
  errorsFromApi: null as string[] | null
}

export type AuthReducerStateType = typeof initialState
type ActionsTypes = setAuthUserDataType | isFetchingSwitchToActionType | captchaUrlSuccessActionType |
  setAuthErrorsFromApiActionType

const authReducer = (state = initialState, action: ActionsTypes): AuthReducerStateType    => {

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
    case SET_AUTH_ERRORS_FROM_API : {
      return {
        ...state,
        errorsFromApi: action.errorsFromApi
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

type isFetchingSwitchToActionType = {type: typeof IS_FETCHING_SWICH_TO, isFetching: boolean}
export const isFetchingSwitchTo = (isFetching:boolean): isFetchingSwitchToActionType => ({type: IS_FETCHING_SWICH_TO, isFetching})

type captchaUrlSuccessActionType = {type: typeof CAPTCHA_URL_SUCCESS, captchaUrl: string}
const captchaUrlSuccess = (captchaUrl: string): captchaUrlSuccessActionType => ({type: CAPTCHA_URL_SUCCESS, captchaUrl})

type setAuthErrorsFromApiActionType = {type: typeof SET_AUTH_ERRORS_FROM_API, errorsFromApi: string[] | null}
const setAuthErrorsFromApi = (errorsFromApi: string[] | null): setAuthErrorsFromApiActionType => ({type: SET_AUTH_ERRORS_FROM_API, errorsFromApi})

export type AuthThunkActionType<R=void> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsTypes>

export const getAuth = (): AuthThunkActionType =>
  async (dispatch) => {
    dispatch(isFetchingSwitchTo(true))
    let response = await authAPI.getAuth()

    if (response.resultCode === 0) {
      let {id, login, email} = response.data
      dispatch(setAuthUserData({id, email, login}, true))
    }
    dispatch(isFetchingSwitchTo(false))

  }

export const loginIn = (loginData: LoginDataType): AuthThunkActionType<string|null> =>
  async (dispatch) => {
    // dispatch(isFetchingSwitchTo(true))
    const response = await authAPI.loginIn(loginData)
    if (response.resultCode === 0) {
      dispatch(getAuth())
      dispatch(setAuthErrorsFromApi(null))
      return null
    } else if (response.resultCode === 10) {
      //десятый код запрашивает капчу и мы забираем её у сервера
      const response = await securityAPI.getCaptchaUrl()
      dispatch(captchaUrlSuccess(response.url))
    } else {
      dispatch(setAuthErrorsFromApi(response.messages))
    }
    // dispatch(isFetchingSwitchTo(false))
    return response.messages
  }

export const loginOut = (): AuthThunkActionType =>
  async (dispatch) => {
    let response = await authAPI.loginOut()

    if (response.resultCode === 0) {
      dispatch(setAuthUserData({id:null, email: null, login: null}, false))
    }

  }

export default authReducer;
