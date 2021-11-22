import {createSelector} from "reselect";
import {authInitialStateTypeData} from "../redux/auth-reducer";
import {StateType} from "../redux/redux-store";

type returned<T> = ( state: StateType) => T

export const getAuthorizedUserData: returned<authInitialStateTypeData> = state => state.auth.data
export const getIsAuthUser: returned<boolean> = state => state.auth.isAuth
export const getAuthURL: returned<string> = state => state.auth.authURL
export const getCaptchaUrl: returned<string|null> = state => state.auth.captchaUrl


export const getAuthorizedUserDataId = createSelector( getAuthorizedUserData, (authorizedUserData) => {
  return authorizedUserData.id
})
