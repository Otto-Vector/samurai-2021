import { errorParser } from '../utils/utils'
import { createSelector } from 'reselect'
import { AppStateType } from '../redux/redux-store'
import { ProfileReducerStateType } from '../redux/profile-reducer'

type ProfileSelector<T extends keyof Y, Y = ProfileReducerStateType> = ( state: AppStateType ) => Y[T]

export const getPosts: ProfileSelector<'posts'> = ( state ) => state.profilePage.posts
export const getNewPostTextPlaceholder: ProfileSelector<'newPostTextPlaceholder'> = ( state ) => state.profilePage.newPostTextPlaceholder

export const getProfileData: ProfileSelector<'profile'> = ( state ) => state.profilePage.profile
export const getProfileIsFetching: ProfileSelector<'isFetching'> = ( state ) => state.profilePage.isFetching
export const getProfileIsAuth: ProfileSelector<'isAuthProfile'> = ( state ) => state.profilePage.isAuthProfile
export const getProfileIsFollowCurrent: ProfileSelector<'isFollowCurrent'> = ( state ) => state.profilePage.isFollowCurrent
export const getProfileIsFollowFetching: ProfileSelector<'isFollowFetching'> = ( state ) => state.profilePage.isFollowFetching
export const getProfileError: ProfileSelector<'errorsFromApi'> = state => state.profilePage.errorsFromApi

export const getErrorFromApi = createSelector( getProfileError,
    ( error: ReturnType<ProfileSelector<'errorsFromApi'>> ) => !error ? null : errorParser( error ),
)
