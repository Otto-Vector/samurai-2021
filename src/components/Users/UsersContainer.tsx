import React, { useEffect } from 'react'
import Users from './Users'
import {
    getUsers,
    usersActions,
    UsersFilter,
} from '../../redux/users-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'

import withAuthRedirect from '../hoc/withAuthRedirect'

import {
    getUsersCurrentPage,
    getUsersPageSize, getUsersFilter,
} from '../../reselect/users-reselector'


const UsersContainer: React.FC = () => {

    const usersFilter = useSelector( getUsersFilter )
    const pageSize = useSelector( getUsersPageSize )
    const currentPage = useSelector( getUsersCurrentPage )

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( getUsers( { pageSize, page: currentPage, ...usersFilter } ) )


    }, [ pageSize, currentPage, usersFilter ] )

    const pageSelect = ( page: number ) => {
        dispatch( usersActions.changePage( page ) )
    }
    // запрос от формы
    const onTermChanged = ( values: UsersFilter ) => {
        dispatch( usersActions.changePage( 1 ) ) // перемещаемся на первую страницу
        dispatch( usersActions.searchUsersFilter( values ) )
    }

    return <>
        <Users
            currentPage={ currentPage }
            pageSize={ pageSize }
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
