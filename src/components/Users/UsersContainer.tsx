import React, { useEffect } from 'react'
import Users from './Users'
import {
    getUsers,
    usersActions,
    UsersFilterType,
} from '../../redux/users-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compose } from 'redux'

import withAuthRedirect from '../hoc/withAuthRedirect'

import {
    getUsersFilterReselect,
} from '../../reselect/users-reselector'
import * as queryString from 'querystring'


const UsersContainer: React.FC = () => {

    const usersFilter = useSelector( getUsersFilterReselect )

    const dispatch = useDispatch()
    const history = useHistory()


    useEffect( () => {
        const {
            page = usersFilter.currentPage,
            term = usersFilter.userName,
            friend = usersFilter.isFriends,
        } = queryString.parse( history.location.search.slice( 1 ) )

        dispatch( usersActions.setUsersFilter( {
            ...usersFilter,
            currentPage: Number( page ),
            userName: term as string,
            isFriends: friend as boolean | null,
        } ) )
    }, [] )

    // записываем запрос в history
    // toDo: исправить (запрос отправляется два раза, один раз по дефолту, второй раз из history)
    useEffect( () => {
        dispatch( getUsers( usersFilter ) )
        // создаём объект для query,
        const query = Object.fromEntries( Object
            .entries( {
                page: usersFilter.currentPage,
                term: usersFilter.userName,
                friend: usersFilter.isFriends,
            } )
            // чистим дефолтные значения
            .filter( n => n[1] !== null )
            .filter( n => n[1] !== 1 )
            .filter( n => n[1] !== '' ),
        )
        // закидываем в history
        history.push( {
            pathname: '/users',
            search: queryString.stringify( query ),
        } )
    }, [ usersFilter ] )

    const pageSelect = ( currentPage: number ) => {
        dispatch( usersActions.setUsersFilter( { ...usersFilter, currentPage } ) )
    }
    // запрос от формы
    const onTermChanged = ( { isFriends, userName }: UsersFilterType ) => {
        dispatch( usersActions.setUsersFilter( {
            pageSize: usersFilter.pageSize,
            currentPage: 1,
            isFriends,
            userName,
        } ) )
    }

    return <>
        <Users
            pageSelect={ pageSelect }
            onTermChanged={ onTermChanged }
            usersFilter={ usersFilter }
        />
    </>
}

/////////////////////////////////////////////////////

export default compose<React.ComponentType>(
    withAuthRedirect,
    React.memo,
)( UsersContainer )
