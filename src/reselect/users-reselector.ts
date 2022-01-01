import {AppStateType} from "../redux/redux-store";
import { UsersReducerStateType } from '../redux/users-reducer'

type AppStateReturned<T> = (state: AppStateType) => T

export const getUsersState: AppStateReturned<UsersReducerStateType['users']> = (state) => state.usersPage.users
export const getPageSize: AppStateReturned<UsersReducerStateType['pageSize']> = ( state) => state.usersPage.pageSize
export const getTotalUsersCount: AppStateReturned<UsersReducerStateType['totalUsersCount']> = ( state) => state.usersPage.totalUsersCount
export const getCurrentPage: AppStateReturned<UsersReducerStateType['currentPage']> = ( state) => state.usersPage.currentPage
export const getIsFetching: AppStateReturned<UsersReducerStateType['isFetching']> = ( state) => state.usersPage.isFetching
export const getIsFetchingById: AppStateReturned<UsersReducerStateType['isFetchingById']> = ( state) => state.usersPage.isFetchingById
export const getIsFriendsFilter: AppStateReturned<UsersReducerStateType['isFriendsFilter']> = ( state) => state.usersPage.isFriendsFilter
export const getUserNameFilter: AppStateReturned<UsersReducerStateType['userNameFilter']> = state => state.usersPage.userNameFilter
