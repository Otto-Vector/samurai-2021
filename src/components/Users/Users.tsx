import React from 'react'
import styles from './Users.module.css'
import Preloader from '../common/Preloader/Preloader'
import UserItem from './UserItem/UserItem'
import Pagination from '../common/Pagination/Pagination'
import { UsersFromSearchType } from '../../redux/types/types'
import { UserSearchForm } from './UsersSearchForm'
import { UsersFilter } from '../../redux/users-reducer'


type PropsType = {
    usersFilter: UsersFilter
    isFetching: boolean
    users: UsersFromSearchType[]
    isFetchingById: number[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
}
type ActionsType = {
    pageSelect: ( selectedPage: number ) => void
    follow: ( userId: number, isFollow: boolean ) => void
    onTermChanged: ( values: UsersFilter ) => void
}
export type UsersPropsType = PropsType & ActionsType

const Users: React.FC<UsersPropsType> = (
    {
        //
        usersFilter, isFetching, isFetchingById,
        users,
        totalUsersCount, pageSize, currentPage,
        // BLL
        pageSelect, follow, onTermChanged,
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
                    usersFilter={ usersFilter }
                    isFetching={isFetching}
                />
            </div>
            { isFetching ? <Preloader/> :
                users.map( ( u ) => <UserItem { ...{ ...u, follow, isFetchingById } } key={ u.id }/> )
            }
        </div>
    )
}

const MemoizedUsers = React.memo(Users)

export default MemoizedUsers
