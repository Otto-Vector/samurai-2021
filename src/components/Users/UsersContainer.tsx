import React, { useEffect } from 'react'
import Users from './Users'
import {
    follow, getUsers, usersActions, UsersFilter,
} from '../../redux/users-reducer'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withAuthRedirect from '../hoc/withAuthRedirect'
import { AppStateType } from '../../redux/redux-store'
import { UsersFromSearchType } from '../../redux/types/types'
import { getUsersType } from '../../api/users-api'
import {
    getCurrentPage,
    getIsFetching, getIsFetchingById,
    getPageSize, getTotalUsersCount, getUsersFilter, getUsersFilterReselect,
    getUsersState,
} from '../../reselect/users-reselector'


type MapStateToPropsType = {
    usersFilter: UsersFilter
    isFetching: boolean
    users: UsersFromSearchType[]
    isFetchingById: number[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
}

type DispatchToPropsType = {
    follow: ( userId: number, isFollow: boolean ) => void
    changePage: ( page: number ) => void
    searchUsersFilter: ( payload: UsersFilter ) => void
    getUsers: ( getUsersOption: getUsersType ) => void
}

type PropsType = MapStateToPropsType & DispatchToPropsType

const UsersContainer: React.FC<PropsType> = (
    {
        isFetching, users, isFetchingById, usersFilter,
        totalUsersCount, pageSize, currentPage,
        //BLL
        follow, changePage, getUsers, searchUsersFilter,
    } ) => {

    useEffect( () => {
        getUsers( { pageSize, page: currentPage, ...usersFilter } )
    }, [ pageSize, currentPage, usersFilter ] )

    const pageSelect = ( page: number ) => {
        changePage( page )
    }

    const onTermChanged = ( values: UsersFilter ) => {
        changePage( 1 ) // перемещаемся на первую страницу
        searchUsersFilter( values )
    }

    return <>
        <Users
            users={ users }
            totalUsersCount={ totalUsersCount }
            pageSize={ pageSize }
            currentPage={ currentPage }
            isFetchingById={ isFetchingById }
            isFetching={ isFetching }
            follow={ follow }
            pageSelect={ pageSelect }
            onTermChanged={ onTermChanged }
            usersFilter={ usersFilter }
        />
    </>
}

/////////////////////////////////////////////////////

const mapStateToProps = ( state: AppStateType ): MapStateToPropsType => {
    return {
        users: getUsersState( state ),
        pageSize: getPageSize( state ),
        totalUsersCount: getTotalUsersCount( state ),
        currentPage: getCurrentPage( state ),
        isFetching: getIsFetching( state ),
        isFetchingById: getIsFetchingById( state ),
        usersFilter: getUsersFilterReselect( state ),
    }
}

const { changePage, searchUsersFilter } = usersActions

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, DispatchToPropsType, {}, AppStateType>( mapStateToProps, {
        follow,
        changePage,
        getUsers,
        searchUsersFilter,
    } ),
    withAuthRedirect,
)( UsersContainer )
