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

    pageSelect: (selectedPage: number) => void
    friendsFilerToggle: () => void
    follow: (followed: boolean, id: number) => void
}

export type UsersPropsType = PropsType

const Users = (props : UsersPropsType) => {

  return (
    <div className={styles.users}>
      <div className={styles.manipulationContainer}>
        <Pagination totalUsersCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    pageSelect={props.pageSelect}
        />
        <button
          className={`${styles.searchFriendsButton} ${props.isFriendsFilter || styles.searchFriendsButtonPassive}`}
          onClick={() => { props.friendsFilerToggle() }}
        >{'Friends Only'}</button>
      </div>
      {props.isFetching ? <Preloader/> :
        props.users.map(u =>
          <UserItem {...u} follow={props.follow} isFetchingById={props.isFetchingById} key={u.id}/>
        )
      }
    </div>
  )
}


export default Users;
