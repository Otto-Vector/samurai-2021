import { ResultCodesEnum } from '../api/samurai-api'
import { UsersFromSearchType } from './types/types'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, GetActionsTypes } from './redux-store'
import { usersApi } from '../api/users-api'


const initialState = {
    users: [] as UsersFromSearchType[],
    totalUsersCount: 0,
    usersFilter: {
        pageSize: 5,
        currentPage: 1,
        isFriends: null as boolean | null, // итого три состояния null - все, true - только друзья, false - все кроме друзей
        userName: '' as string | undefined,
    },
    isFetching: true,
    isFetchingById: [] as number[],
}

export type UsersReducerStateType = typeof initialState
export type UsersFilterType = typeof initialState.usersFilter

type ActionsType = GetActionsTypes<typeof usersActions>

const usersReducer = ( state = initialState, action: ActionsType ): UsersReducerStateType => {

    switch (action.type) {
        case 'users-reducer/FOLLOW-TOGGLE': {
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: action.isFollow }
                    }
                    return u
                } ),
            }
        }
        case 'users-reducer/SET-USERS': {
            return {
                ...state,
                users: action.users,
            }
        }
        case 'users-reducer/SET-TOTAL-USERS-COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            }
        }
        case 'users-reducer/TOGGLE-IS-FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching,
            }
        }

        case 'users-reducer/TOGGLE-IS-FETCHING-BY-ID': {
            return {
                ...state,
                isFetchingById: action.isFetching
                    ? [ ...state.isFetchingById, action.userId ]
                    : state.isFetchingById.filter( id => action.userId !== id ),
            }
        }
        case 'users-reducer/SET-USERS-FILTER': {
            return {
                ...state,
                usersFilter: { ...action.payload },
            }
        }
        default: {
            return state
        }
    }

}

/* ЭКШОНЫ USERS */

export const usersActions = {
    // добавление|удаление пользователя в список друзей
    followSuccessToggle: ( userId: number, isFollow: boolean ) => ({
        type: 'users-reducer/FOLLOW-TOGGLE',
        userId,
        isFollow,
    } as const),
    // установка значения в карточки пользователей одной страницы
    setUsers: ( users: UsersFromSearchType[] ) => ({
        type: 'users-reducer/SET-USERS',
        users,
    } as const),
    // записывает общее количество найденных пользователей
    // (для подсчёта в пагинаторе)
    setTotalUsersCount: ( totalUsersCount: number ) => ({
        type: 'users-reducer/SET-TOTAL-USERS-COUNT',
        totalUsersCount,
    } as const),
    // ожидание отклика API на запрос поиска пользователей
    toggleIsFetching: ( isFetching: boolean ) => ({
        type: 'users-reducer/TOGGLE-IS-FETCHING',
        isFetching,
    } as const),
    // ожидание отклика API при нажании follow/unfollow
    isFetchingFollowed: ( isFetching: boolean, userId: number ) => ({
        type: 'users-reducer/TOGGLE-IS-FETCHING-BY-ID',
        isFetching,
        userId,
    } as const),
    // запись в стейт текущего фильтра (имя, выборка друзей)
    setUsersFilter: ( payload: UsersFilterType ) => ({
        type: 'users-reducer/SET-USERS-FILTER',
        payload,
    } as const),
}

/* САНКИ */

export type UsersReducerThunkActionType<R = void> = ThunkAction<Promise<R>, AppStateType, unknown, ActionsType>
// запрос на API и запись в стейт значений поиска пользователей
export const getUsers = ( { pageSize, currentPage, isFriends = null, userName = undefined }: UsersFilterType ): UsersReducerThunkActionType =>
    async ( dispatch ) => {

        dispatch( usersActions.toggleIsFetching( true ) )

        const response = await usersApi.getUsers( { pageSize, currentPage, isFriends, userName } )

        dispatch( usersActions.setUsers( response.items ) )

        dispatch( usersActions.setTotalUsersCount( response.totalCount ) )

        dispatch( usersActions.toggleIsFetching( false ) )
    }

// подписка или отписка от друзей через запрос API
export const follow = ( userId: number, isFollow: boolean ): UsersReducerThunkActionType =>
    async ( dispatch ) => {
        dispatch( usersActions.isFetchingFollowed( true, userId ) )

        const response = await usersApi[isFollow ? 'follow' : 'unfollow']( userId )

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch( usersActions.followSuccessToggle( userId, isFollow ) )
        }

        dispatch( usersActions.isFetchingFollowed( false, userId ) )

    }


export default usersReducer
