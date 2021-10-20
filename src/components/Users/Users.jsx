import React from "react";
import styles from "./Users.module.css"
import Pagination from "../common/Pagination/Pagination"
import userNoImage from '../../assets/images/userNoImage.png'
import {NavLink} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";

const Users = (props) => {

  return (
    <div className={styles.users}>
      <div className={styles.manipulationContainer}>
        <Pagination totalCount={props.totalUsersCount}
                    pageSize={props.pageSize}
                    currentPage={props.currentPage}
                    pageSelect={props.pageSelect}
        />
        <button className={`${styles.searchFriendsButton} ${props.isFriendsFilter || styles.searchFriendsButtonPassive}`}
                onClick={()=>{props.friendsFilterOn()}}
        >{'Friends Only'}</button>
      </div>
      { props.isFetching ? <Preloader/> :
        props.users.map(u => <div className={styles.user} key={u.id}>
        <div className={styles.logoButtonWrapper}>
          <NavLink to={"/profile/" + u.id} className={styles.logoWrapper}>
            <img className={styles.image} src={u.photos.small || userNoImage} alt='userFace'/>
          </NavLink>
          <div>
            <button disabled={props.isFetchingById.some(id => id === u.id)}
                    className={styles.followButton + ' ' + styles[u.followed ? 'unfollow' : 'follow']}
                    onClick={() => {
                      props.follow(u.followed, u.id)
                    }}
            >{u.followed ? 'unfollow' : 'follow'}</button>
          </div>
        </div>
        <div className={styles.userInfoWrapper}>
          <div className={styles.userNameStatusWrapper}>
            <div className={styles.userFullname}>{u.name}</div>
            <div className={styles.userStatus}>{u.status}</div>
          </div>
          <div className={styles.locationWrapper}>
            <div>{"u.location.country+','"}</div>
            <div>{"u.location.city"}</div>
          </div>
        </div>
      </div>)
      }
    </div>
  )
}


export default Users;
