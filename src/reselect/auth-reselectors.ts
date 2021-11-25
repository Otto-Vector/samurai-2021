import {createSelector} from "reselect";
import {StateType} from "../redux/redux-store";
import {AuthDataType} from "../redux/types/types";

type Returned<T> = (state: StateType) => T

export const getAuthorizedUserData: Returned<AuthDataType> = state => state.auth.data
export const getIsAuthUser: Returned<boolean> = state => state.auth.isAuth
export const getAuthURL: Returned<string> = state => state.auth.authURL
export const getCaptchaUrl: Returned<string|null> = state => state.auth.captchaUrl


export const getAuthorizedUserDataId = createSelector( getAuthorizedUserData, (authorizedUserData): number | null => {
  return authorizedUserData.id
})
