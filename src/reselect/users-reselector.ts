import { AppStateType } from '../redux/redux-store'
import { UsersReducerStateType } from '../redux/users-reducer'
import { createSelector } from 'reselect'

type UsersReselector<T extends keyof Y, Y = UsersReducerStateType> = ( state: AppStateType ) => Y[T]

export const getUsersState: UsersReselector<'users'> = ( state ) => state.usersPage.users
export const getPageSize: UsersReselector<'pageSize'> = ( state ) => state.usersPage.pageSize
export const getTotalUsersCount: UsersReselector<'totalUsersCount'> = ( state ) => state.usersPage.totalUsersCount
export const getCurrentPage: UsersReselector<'currentPage'> = ( state ) => state.usersPage.currentPage
export const getIsFetching: UsersReselector<'isFetching'> = ( state ) => state.usersPage.isFetching
export const getIsFetchingById: UsersReselector<'isFetchingById'> = ( state ) => state.usersPage.isFetchingById
export const getUsersFilter: UsersReselector<'usersFilter'> = ( state ) => state.usersPage.usersFilter

export const getUsersFilterReselect = createSelector( getUsersFilter, ( filter ) => filter )
