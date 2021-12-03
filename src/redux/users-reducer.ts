import {UsersAPI} from "../api/samurai-api";
import {UsersFromSearchType} from "./types/types";
import {Dispatch} from "redux";

const FOLLOW_TOGGLE = 'users-reducer/FOLLOW-TOGGLE'
const SET_USERS = 'users-reducer/SET-USERS'
const CHANGE_PAGE = 'users-reducer/CHANGE-PAGE'
const SET_TOTAL_USERS_COUNT = 'users-reducer/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'users-reducer/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FETCHING_BY_ID = 'users-reducer/TOGGLE-IS-FETCHING-BY-ID'
const TOGGLE_FRIENDS_ONLY = 'users-reducer/TOGGLE-FRIENDS-ONLY'

let initialState = {
    users: [] as UsersFromSearchType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFriendsFilter: null as boolean | null,
    isFetching: true,
    isFetchingById: [6]
}

export type UsersReducerStateType = typeof initialState
type ActionsTypes =
    followSuccessToggleActionType |
    setUsersActionType |
    changePageActionType |
    setTotalUsersCountActionType |
    toggleIsFetchingActionType |
    isFetchingToggleIdActionType |
    friendsOnlyToggleActionType


let usersReducer = (state = initialState, action: ActionsTypes): UsersReducerStateType => {

    switch (action.type) {
        case FOLLOW_TOGGLE: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: action.isFollow}
                    }
                    return u
                })
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case CHANGE_PAGE: {
            return {
                ...state,
                currentPage: action.page
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FETCHING_BY_ID: {
            return {
                ...state,
                isFetchingById: action.isFetching
                    ? [...state.isFetchingById, action.userId]
                    : state.isFetchingById.filter(id => action.userId !== id)
            }
        }
        case TOGGLE_FRIENDS_ONLY: {
            return {
                ...state,
                isFriendsFilter: action.isFriendsFilter
            }
        }

        default: {
            return state
        }
    }

    // return state
}
type followSuccessToggleActionType = { type: typeof FOLLOW_TOGGLE, userId: number, isFollow: boolean }
export const followSuccessToggle = (userId: number, isFollow: boolean): followSuccessToggleActionType => ({
    type: FOLLOW_TOGGLE,
    userId,
    isFollow
})

type setUsersActionType = { type: typeof SET_USERS, users: UsersFromSearchType[] }
export const setUsers = (users: UsersFromSearchType[]): setUsersActionType => ({type: SET_USERS, users})

type changePageActionType = { type: typeof CHANGE_PAGE, page: number }
export const changePage = (page: number): changePageActionType => ({type: CHANGE_PAGE, page})

type setTotalUsersCountActionType = { type: typeof SET_TOTAL_USERS_COUNT, totalUsersCount: number }
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})

type toggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

type isFetchingToggleIdActionType = { type: typeof TOGGLE_IS_FETCHING_BY_ID, isFetching: boolean, userId: number }
export const isFetchingToggleId = (isFetching: boolean, userId: number): isFetchingToggleIdActionType => ({
    type: TOGGLE_IS_FETCHING_BY_ID,
    isFetching,
    userId
})

type friendsOnlyToggleActionType = { type: typeof TOGGLE_FRIENDS_ONLY, isFriendsFilter: boolean | null }
export const friendsOnlyToggle = (isFriendsFilter: boolean | null): friendsOnlyToggleActionType => ({
    type: TOGGLE_FRIENDS_ONLY,
    isFriendsFilter
})


export const getUsers = (pageSize: number, page: number, isFriendsFilter = null as boolean|null) =>
    async (dispatch: Function | Dispatch<ActionsTypes>) => {

        dispatch(toggleIsFetching(true))

        let response = await UsersAPI.getUsers(pageSize, page, isFriendsFilter)

        dispatch(setUsers(response.items))

        dispatch(setTotalUsersCount(response.totalCount))

        dispatch(toggleIsFetching(false))
    }


export const follow = (isFollow: boolean, userId: number) =>
    async (dispatch: any) => {
        dispatch(isFetchingToggleId(true, userId))

        const todo = !isFollow ? 'follow' : 'unfollow'

        const response = await UsersAPI[todo](userId)

        if (response.resultCode === 0) {
            dispatch(followSuccessToggle(userId, !isFollow))
        }

        dispatch(isFetchingToggleId(false, userId))

    }


export default usersReducer
