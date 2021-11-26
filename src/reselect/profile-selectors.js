import {errorParser} from "../utils/utils";
import {createSelector} from "reselect";

export const getPosts = state => state.profilePage.posts
export const getNewPostTextPlaceholder = state => state.profilePage.newPostTextPlaceholder

export const getProfileData = state => state.profilePage.profile
export const getProfileIsFetching = state => state.profilePage.isFetching
export const getProfileIsAuth = state => state.profilePage.isAuthProfile
export const getError = state => state.profilePage.errorsFromApi

export const getErrorFromApi = createSelector( getError,
  (error) => !error ? null : errorParser(error)
)
