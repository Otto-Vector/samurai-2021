// import {errorParser} from "../utils/utils";
// import {createSelector} from "reselect";
import {AppStateType} from "../redux/redux-store";
import {UsersReducerStateType} from "../redux/profile-reducer";

type AppStateReturned<T> = (state: AppStateType) => T

export const getPosts: AppStateReturned<UsersReducerStateType['posts']> = ( state) => state.profilePage.posts
export const getNewPostTextPlaceholder: AppStateReturned<UsersReducerStateType['newPostTextPlaceholder']> = ( state) => state.profilePage.newPostTextPlaceholder

export const getProfileData: AppStateReturned<UsersReducerStateType['profile']> = ( state) => state.profilePage.profile
export const getProfileIsFetching: AppStateReturned<UsersReducerStateType['isFetching']> = ( state) => state.profilePage.isFetching
export const getProfileIsAuth: AppStateReturned<UsersReducerStateType['isAuthProfile']> = ( state) => state.profilePage.isAuthProfile
export const getIsFollowCurrent: AppStateReturned<UsersReducerStateType['isFollowCurrent']> = ( state) => state.profilePage.isFollowCurrent
export const getIsFollowFetching: AppStateReturned<UsersReducerStateType['isFollowFetching']> = ( state) => state.profilePage.isFollowFetching
// export const getError: AppStateReturned<ProfileReducerStateType['errorsFromApi']> = state => state.profilePage.errorsFromApi
//
// export const getErrorFromApi = createSelector( getError,
//   (error:ProfileReducerStateType['errorsFromApi']) => !error ? null : errorParser(error)
// )
