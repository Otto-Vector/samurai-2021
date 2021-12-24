// import {errorParser} from "../utils/utils";
// import {createSelector} from "reselect";
import {AppStateType} from "../redux/redux-store";
import {ProfileReducerStateType} from "../redux/profile-reducer";

type AppStateReturned<T> = (state: AppStateType) => T

export const getPosts: AppStateReturned<ProfileReducerStateType['posts']> = (state) => state.profilePage.posts
export const getNewPostTextPlaceholder: AppStateReturned<ProfileReducerStateType['newPostTextPlaceholder']> = (state) => state.profilePage.newPostTextPlaceholder

export const getProfileData: AppStateReturned<ProfileReducerStateType['profile']> = (state) => state.profilePage.profile
export const getProfileIsFetching: AppStateReturned<ProfileReducerStateType['isFetching']> = (state) => state.profilePage.isFetching
export const getProfileIsAuth: AppStateReturned<ProfileReducerStateType['isAuthProfile']> = (state) => state.profilePage.isAuthProfile
export const getIsFollowCurrent: AppStateReturned<ProfileReducerStateType['isFollowCurrent']> = (state) => state.profilePage.isFollowCurrent
export const getIsFollowFetching: AppStateReturned<ProfileReducerStateType['isFollowFetching']> = (state) => state.profilePage.isFollowFetching
// export const getError: AppStateReturned<ProfileReducerStateType['errorsFromApi']> = state => state.profilePage.errorsFromApi
//
// export const getErrorFromApi = createSelector( getError,
//   (error:ProfileReducerStateType['errorsFromApi']) => !error ? null : errorParser(error)
// )
