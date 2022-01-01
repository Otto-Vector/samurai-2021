import React from 'react'
import styles from './Users.module.css'
import Preloader from '../common/Preloader/Preloader'
import UserItem from './UserItem/UserItem'
import Pagination from '../common/Pagination/Pagination'
import { UsersFromSearchType } from '../../redux/types/types'
import { UserSearchForm } from './UsersSearchForm'
import { getUsersType } from '../../api/users-api'

type PropsType = {
    isFriendsFilter: boolean | null
    userNameFilter: string | undefined
    isFetching: boolean
    users: UsersFromSearchType[]
    isFetchingById: number[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
}
type ActionsType = {
    pageSelect: ( selectedPage: number ) => void
    friendsFilerToggle: () => void
    follow: ( userId: number, isFollow: boolean ) => void
    onTermChanged: ( term: string | undefined ) => void
}

export type UsersPropsType = PropsType & ActionsType

const Users: React.FC<UsersPropsType> = (
    {
        isFriendsFilter, isFetching, users,
        isFetchingById, totalUsersCount, pageSize, currentPage,
        pageSelect, friendsFilerToggle, follow, onTermChanged, userNameFilter,
    } ) => {


    return (
        <div className={ styles.users }>
            <div className={ styles.manipulationContainer }>

                <Pagination
                    totalUsersCount={ totalUsersCount }
                    pageSize={ pageSize }
                    currentPage={ currentPage }
                    pageSelect={ pageSelect }
                />
                <UserSearchForm
                    onTermChanged={ onTermChanged }
                    userNameFilter={ userNameFilter }
                />
                <button
                    className={ `${ styles.searchFriendsButton } ${ isFriendsFilter || styles.searchFriendsButtonPassive }` }
                    onClick={ () => {
                        friendsFilerToggle()
                    } }
                >{ 'Friends Only' }</button>
            </div>
            { isFetching ? <Preloader/> :
                users.map( ( u ) => <UserItem { ...{ ...u, follow, isFetchingById } } key={ u.id }/> )
            }
        </div>
    )
}


export default Users
