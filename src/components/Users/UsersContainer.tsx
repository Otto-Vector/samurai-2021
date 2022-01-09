import React, { useEffect, useState } from 'react'
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

    const dispatch = useDispatch()
    const history = useHistory()
    const usersFilter = useSelector( getUsersFilterReselect )

    let [ isMount, setIsMount ] = useState( false )

    useEffect( () => {
        // забираем данные из history
        const {
            page = usersFilter.currentPage,
            term = usersFilter.userName,
            friend = usersFilter.isFriends,
        } = queryString.parse( history.location.search.slice( 1 ) )

        // меняем данные стейта
        dispatch( usersActions.setUsersFilter( {
            ...usersFilter,
            currentPage: Number( page ),
            userName: term as string,
            isFriends: friend as boolean | null,
        } ) )

        // отмечаем, что эффект сработал
        setIsMount( true )
    }, [] )


    useEffect( () => {
        // скипаем первый рендер, где присваевается значение из history
        if (isMount) {
            // сам запрос на сервер
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
        }
    }, [ usersFilter ] ) // зависимость ТОЛЬКО от изменения usersFilter

    // смена страницы
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
