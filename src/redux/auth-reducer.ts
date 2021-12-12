import {ResultCodesEnum, ResultCodesWithCaptchaEnum} from "../api/samurai-api";
import {AuthDataType, LoginDataType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, GetActionsTypes} from "./redux-store";
import {authAPI, securityAPI} from "../api/auth-api";

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
type ActionsType = GetActionsTypes<typeof authActions>


const authReducer = (state = initialState, action: ActionsType): AuthReducerStateType => {

  switch (action.type) {

    case 'auth-reducer/SET-AUTH' : {
      return {
        ...state,
        data: {...action.payload},
        isAuth: action.isAuth
      }
    }
    case 'auth-reducer/IS-FETCHING-SWITCH-TO' : {
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

/* ЭКШОНЫ АВТОРИЗАЦИИ */
const authActions = {
  // обновляет данные авторизированного пользователя
  setAuthUserData: (payload: AuthDataType, isAuth: boolean) => ({
    type: 'auth-reducer/SET-AUTH',
    payload,
    isAuth
  } as const),
  // индикация загрузки данных
  isFetchingSwitchTo: (isFetching: boolean) => ({
    type: 'auth-reducer/IS-FETCHING-SWITCH-TO',
    isFetching
  } as const),
  // капча прилетела в url
  captchaUrlSuccess: (captchaUrl: string) => ({
    type: 'auth-reducer/CAPTCHA_URL_SUCCESS',
    captchaUrl
  } as const),
}

/* САНКИ */
// типизация санок авторизации
export type AuthThunkActionType<R = void> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsType>

// запрос авторизации
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

// авторизация по логину и паролю
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

// выход из авторизованного режима
export const loginOut = (): AuthThunkActionType =>
  async (dispatch) => {
    const response = await authAPI.loginOut()

    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(authActions.setAuthUserData({id: null, email: null, login: null}, false))
    }

  }

export default authReducer;
