import {createSelector} from "reselect";
import {AppStateType} from "../redux/redux-store";
import {AuthDataType} from "../redux/types/types";
import {AuthReducerStateType} from "../redux/auth-reducer";

type AppStateReturned<T> = (state: AppStateType) => T

export const getAuthorizedUserData: AppStateReturned<AuthDataType> = (state) => state.auth.data
export const getIsAuthUser: AppStateReturned<AuthReducerStateType['isAuth']> = (state) => state.auth.isAuth
export const getAuthURL: AppStateReturned<AuthReducerStateType['authURL']> = (state) => state.auth.authURL
export const getAuthCaptchaUrl: AppStateReturned<AuthReducerStateType['captchaUrl']> = (state) => state.auth.captchaUrl
// export const getAuthErrorsFromApi: AppStateReturned<AuthReducerStateType['errorsFromApi']> = (state) => state.auth.errorsFromApi
export const getAuthIsFetching: AppStateReturned<AuthReducerStateType['isFetching']> = (state) => state.auth.isFetching

export const getAuthorizedUserDataId = createSelector( getAuthorizedUserData,
    (authorizedUserData: AuthDataType) : AuthDataType['id']=> {
  return authorizedUserData.id
})


