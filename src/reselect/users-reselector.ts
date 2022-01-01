import {AppStateType} from "../redux/redux-store";
import { UsersFilter, UsersReducerStateType } from '../redux/users-reducer'
import { createSelector } from 'reselect'

type AppStateReturned<T> = (state: AppStateType) => T

export const getUsersState: AppStateReturned<UsersReducerStateType['users']> = (state) => state.usersPage.users
export const getPageSize: AppStateReturned<UsersReducerStateType['pageSize']> = ( state) => state.usersPage.pageSize
export const getTotalUsersCount: AppStateReturned<UsersReducerStateType['totalUsersCount']> = ( state) => state.usersPage.totalUsersCount
export const getCurrentPage: AppStateReturned<UsersReducerStateType['currentPage']> = ( state) => state.usersPage.currentPage
export const getIsFetching: AppStateReturned<UsersReducerStateType['isFetching']> = ( state) => state.usersPage.isFetching
export const getIsFetchingById: AppStateReturned<UsersReducerStateType['isFetchingById']> = ( state) => state.usersPage.isFetchingById
export const getUsersFilter: AppStateReturned<UsersFilter> = (state) => state.usersPage.usersFilter

export const getUsersFilterReselect = createSelector( getUsersFilter,  (filter) => filter )
