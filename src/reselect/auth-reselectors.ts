import { createSelector } from 'reselect'
import { AppStateType } from '../redux/redux-store'
import { AuthDataType } from '../redux/types/types'
import { AuthReducerStateType } from '../redux/auth-reducer'

type AuthReselector<T extends keyof Y, Y = AuthReducerStateType> = ( state: AppStateType ) => Y[T]

export const getAuthorizedUserData: AuthReselector<'data'> = ( state ) => state.auth.data
export const getIsAuthUser: AuthReselector<'isAuth'> = ( state ) => state.auth.isAuth
export const getAuthURL: AuthReselector<'authURL'> = ( state ) => state.auth.authURL
export const getAuthCaptchaUrl: AuthReselector<'captchaUrl'> = ( state ) => state.auth.captchaUrl
export const getAuthIsFetching: AuthReselector<'isFetching'> = ( state ) => state.auth.isFetching
// export const getAuthErrorsFromApi: AppStateReturned<AuthReducerStateType['errorsFromApi']> = (state) => state.auth.errorsFromApi

export const getAuthorizedUserDataId = createSelector( getAuthorizedUserData,
    ( authorizedUserData: AuthDataType ): AuthDataType['id'] => {
        return authorizedUserData.id
    } )


