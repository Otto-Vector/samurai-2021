import React from "react";
import styles from "./Users.module.css"
import Pagination from "../common/Pagination/Pagination"
import Preloader from "../common/Preloader/Preloader";
import UserItem from "./UserItem/UserItem";

const Users = props => {

  return (
    <div className={styles.users}>
      <div className={styles.manipulationContainer}>
        <Pagination totalCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    pageSelect={props.pageSelect}
        />
        <button
          className={`${styles.searchFriendsButton} ${props.isFriendsFilter || styles.searchFriendsButtonPassive}`}
          onClick={() => { props.friendsFilterOn() }}
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
