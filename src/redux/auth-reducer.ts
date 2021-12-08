import {authAPI, ResultCodesEnum, ResultCodesWithCaptchaEnum, securityAPI} from "../api/samurai-api";
import {AuthDataType, LoginDataType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {ActionsAnyType, AppStateType, GetActionsTypes} from "./redux-store";

const initialState = {
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
type ActionsTypes = GetActionsTypes<typeof authActions>


const authReducer = (state = initialState, action: ActionsTypes): AuthReducerStateType => {

  switch (action.type) {

    case 'auth-reducer/SET-AUTH' : {
      return {
        ...state,
        data: {...action.payload},
        isAuth: action.isAuth
      }
    }
    case 'auth-reducer/IS-FETCHING-SWICH-TO' : {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case 'auth-reducer/CAPTCHA_URL_SUCCESS' : {
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


const authActions: ActionsAnyType = {
  setAuthUserData: (payload: AuthDataType, isAuth: boolean) => ({
    type: 'auth-reducer/SET-AUTH',
    payload,
    isAuth
  } as const),
  isFetchingSwitchTo: (isFetching: boolean) => ({
    type: 'auth-reducer/IS-FETCHING-SWICH-TO',
    isFetching
  } as const),
  captchaUrlSuccess: (captchaUrl: string) => ({
    type: 'auth-reducer/CAPTCHA_URL_SUCCESS',
    captchaUrl
  } as const),
}


export type AuthThunkActionType<R = void> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsTypes>

export const getAuth = (): AuthThunkActionType =>
  async (dispatch) => {
    dispatch(authActions.isFetchingSwitchTo(true))
    const response = await authAPI.getAuth()

    if (response.resultCode === ResultCodesEnum.Success) {
      const {id, login, email} = response.data
      dispatch(authActions.setAuthUserData({id, email, login}, true))
    }
    dispatch(authActions.isFetchingSwitchTo(false))
  }

export const loginIn = (loginData: LoginDataType): AuthThunkActionType<string[] | null > =>
  async (dispatch) => {
    const response = await authAPI.loginIn(loginData)

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuth())
      return null

    } else if (response.resultCode === ResultCodesWithCaptchaEnum.CaptchaRequired) {
      //десятый код запрашивает капчу и мы забираем её у сервера
      const response = await securityAPI.getCaptchaUrl()
      dispatch(authActions.captchaUrlSuccess(response.url))
    }
    return response.messages
  }

export const loginOut = (): AuthThunkActionType =>
  async (dispatch) => {
    const response = await authAPI.loginOut()

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(authActions.setAuthUserData({id: null, email: null, login: null}, false))
    }

  }

export default authReducer;
