import { UsersFromSearchType } from '../redux/types/types'
import { instance, ResponseApiType } from './samurai-api'
import { UsersFilterType } from '../redux/users-reducer'
import * as queryString from 'querystring'

// этот тип отличается от других стандартных и подходит только для Users
export type ResponseUsersApiType = {
    items: UsersFromSearchType[]
    totalCount: number
    error: string | null
}

export const usersApi = {
    // запрос одной страницы пользователей из сервера
    getUsers( { pageSize, currentPage, isFriends, userName }: UsersFilterType ) {

        // создаём объект для query,
        const query = Object.fromEntries( Object
            .entries( { term: userName, friend: isFriends ?? 'null', page: currentPage, count: pageSize } )
            // чистим пустые значения
            .filter( n => n[1] !== '' )
            .filter( n => n[1] !== undefined )
        )

        return instance.get<ResponseUsersApiType>( `users?${ queryString.stringify( query ) }` )
            .then( response => response.data )
    },

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
