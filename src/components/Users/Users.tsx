import React from "react";
import styles from "./Users.module.css"
import Preloader from "../common/Preloader/Preloader";
import UserItem from "./UserItem/UserItem";
import Pagination from "../common/Pagination/Pagination"
import {UsersFromSearchType} from "../../redux/types/types";

type PropsType = {
  isFriendsFilter: boolean | null
  isFetching: boolean
  users: UsersFromSearchType[]
  isFetchingById: number[]
  totalUsersCount: number
  pageSize: number
  currentPage: number
}
type ActionsType = {
  pageSelect: (selectedPage: number) => void
  friendsFilerToggle: () => void
  follow: (followed: boolean, id: number) => void
}

export type UsersPropsType = PropsType & ActionsType

const Users: React.FC<UsersPropsType> = (
  {
    isFriendsFilter, isFetching, users,
    isFetchingById, totalUsersCount, pageSize, currentPage,
    pageSelect, friendsFilerToggle, follow,
  }) => {

  return (
    <div className={ styles.users }>
      <div className={ styles.manipulationContainer }>
        <Pagination { ...{
          totalUsersCount,
          pageSize,
          currentPage,
          pageSelect,
        } }
        />
        <button
          className={ `${ styles.searchFriendsButton } ${ isFriendsFilter || styles.searchFriendsButtonPassive }` }
          onClick={ () => { friendsFilerToggle() } }
        >{ 'Friends Only' }</button>
      </div>
      { isFetching ? <Preloader/> :
        users.map( (u) => <UserItem { ...{...u, follow, isFetchingById} } key={ u.id }/> )
      }
    </div>
  )
}


export default Users;
