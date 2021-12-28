import { UsersFromSearchType } from '../redux/types/types'
import { instance, ResponseApiType } from './samurai-api'

// этот тип отличается от других стандартных и подходит только для Users
export type ResponseUsersApiType = {
    items: UsersFromSearchType[]
    totalCount: number
    error: string | null
}

export type getUsersType = {
    pageSize: number
    page: number
    isFriendsFilter?: boolean | null
    userName?: string
}


export const usersApi = {
    // запрос одной страницы пользователей из сервера
    getUsers( { pageSize, page, isFriendsFilter, userName }: getUsersType) {
        const friend = `&friend=${ isFriendsFilter ?? null }`
        const term = userName ? `&term=${ userName }` : ''
        return instance.get<ResponseUsersApiType>( `users?count=${ pageSize }&page=${ page }${ friend }${ term }` )
            .then( response => response.data )
    },
    // // поиск пользователей по имени
    // getUsersByName( { pageSize, page, isFriendsFilter, userName }: getUsersTermType ) {
    //     return instance.get<ResponseUsersApiType>( `users?count=${ pageSize }&page=${ page }&friend=${ isFriendsFilter }&term=${ userName }` )
    //         .then( response => response.data )
    // },
    // отписаться
    unfollow( id: number ) {
        return instance.delete<ResponseApiType>( `follow/${ id }` )
            .then( res => res.data )
    },
    // подписаться
    follow( id: number ) {
        return instance.post<ResponseApiType>( `follow/${ id }` )
            .then( res => res.data )
    },
    // является ли данный пользователь другом
    isFriend( id: number ) {
        return instance.get<boolean | { message: string }>( `follow/${ id }` )
            .then( res => res.data )
    },
}
