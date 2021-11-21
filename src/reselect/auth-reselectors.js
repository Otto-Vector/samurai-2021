import {createSelector} from "reselect";


export const getAuthorizedUserData = state => state.auth.data
export const getIsAuthUser = state => state.auth.isAuth
export const getAuthURL = state => state.auth.authURL
export const getCaptchaUrl = state => state.auth.captchaUrl


export const getAuthorizedUserDataId = createSelector( getAuthorizedUserData, (authorizedUserData) => {
  return authorizedUserData.id
})
