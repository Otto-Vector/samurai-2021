import React from 'react'
import styles from './Users.module.css'
import Preloader from '../common/Preloader/Preloader'
import UserItem from './UserItem/UserItem'
import Pagination from '../common/Pagination/Pagination'
import { UserSearchForm } from './UsersSearchForm'
import { follow, UsersFilterType } from '../../redux/users-reducer'
import { useDispatch, useSelector } from 'react-redux'
import {
    getTotalUsersCount,
    getUsersIsFetching, getUsersIsFetchingById,
    getUsersState,
} from '../../reselect/users-reselector'


type PropsType = {
    usersFilter: UsersFilterType
}

type ActionsType = {
    pageSelect: ( selectedPage: number ) => void
    onTermChanged: ( values: UsersFilterType ) => void
}
export type UsersPropsType = PropsType & ActionsType

const Users: React.FC<UsersPropsType> = (
    {
        usersFilter, pageSelect, onTermChanged,
    } ) => {

    const dispatch = useDispatch()

    // для пагинатора
    const totalUsersCount = useSelector( getTotalUsersCount )

    // для Users
    const users = useSelector( getUsersState )
    const isFetching = useSelector( getUsersIsFetching )
    const isFetchingById = useSelector( getUsersIsFetchingById )

    const followUser = ( userId: number, isFollow: boolean ) => {
        dispatch( follow( userId, isFollow ) )
    }

    return (
        <div className={ styles.users }>
            <div className={ styles.manipulationContainer }>

                <Pagination
                    totalUsersCount={ totalUsersCount }
                    pageSize={ usersFilter.pageSize }
                    currentPage={ usersFilter.currentPage }
                    pageSelect={ pageSelect }
                />
                <UserSearchForm
                    onTermChanged={ onTermChanged }
                    usersFilter={ usersFilter }
                    isFetching={ isFetching }
                />
            </div>
            { isFetching ? <Preloader/> :
                users.map( ( u ) => <UserItem { ...{ ...u, followUser, isFetchingById } } key={ u.id }/> )
            }
        </div>
    )
}

const MemoizedUsers = React.memo( Users )

export default MemoizedUsers
