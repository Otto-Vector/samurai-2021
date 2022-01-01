import React, { useEffect } from 'react'
import Users from './Users'
import {
    follow, getUsers, usersActions,
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
    getIsFriendsFilter,
    getPageSize, getTotalUsersCount, getUserNameFilter,
    getUsersState,
} from '../../reselect/users-reselector'


type MapStateToPropsType = {
    isFriendsFilter: boolean | null
    userNameFilter: string | undefined
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
    getUsers: ( getUsersOption: getUsersType ) => void
    friendsOnlyToggle: ( isFriendsFilter: boolean | null ) => void
    searchUsersFilter: ( userNameFilter: string | undefined ) => void
}

type PropsType = MapStateToPropsType & DispatchToPropsType

const UsersContainer: React.FC<PropsType> = (
    {
        isFriendsFilter, isFetching, users, isFetchingById,
        totalUsersCount, pageSize, currentPage,
        //BLL
        follow, changePage, getUsers, friendsOnlyToggle, userNameFilter, searchUsersFilter,
    } ) => {


    useEffect( () => {
        getUsers( { pageSize, page: currentPage, userName: userNameFilter, isFriendsFilter } )
        // return friendsOnlyToggle( null )
    }, [ pageSize, currentPage, userNameFilter, isFriendsFilter ] )


    const pageSelect = ( page: number ) => {
        changePage( page )
    }

    const friendsFilerToggle = () => {
        changePage( 1 ) // перемещаемся на первую страницу
        const isFriends = isFriendsFilter ? null : true // принимает только null, true или false(только не друзья)
        friendsOnlyToggle( isFriends )
    }

    const onTermChanged = ( term: string | undefined ) => {
        changePage( 1 ) // перемещаемся на первую страницу
        searchUsersFilter( term )
    }

    return <>
        <Users
            users={ users }
            totalUsersCount={ totalUsersCount }
            pageSize={ pageSize }
            currentPage={ currentPage }
            isFetchingById={ isFetchingById }
            isFriendsFilter={ isFriendsFilter }
            isFetching={ isFetching }
            follow={ follow }
            pageSelect={ pageSelect }
            friendsFilerToggle={ friendsFilerToggle }
            onTermChanged={ onTermChanged }
            userNameFilter={ userNameFilter }
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
        isFriendsFilter: getIsFriendsFilter( state ),
        userNameFilter: getUserNameFilter( state ),
    }
}

const { changePage, friendsOnlyToggle, searchUsersFilter } = usersActions

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, DispatchToPropsType, {}, AppStateType>( mapStateToProps, {
        follow,
        changePage,
        getUsers,
        friendsOnlyToggle,
        searchUsersFilter,
    } ),
    withAuthRedirect,
)( UsersContainer )
