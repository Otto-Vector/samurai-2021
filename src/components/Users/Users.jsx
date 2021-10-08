import React from "react";
import styles from "./Users.module.css"
import Pagination from "../common/Pagination/Pagination"
// import {randomFaceImage} from "../../redux/randomFace";
import userNoImage from '../../assets/images/userNoImage.png'
import {NavLink} from "react-router-dom";


const Users = (props) => {

    return (
    <div className={styles.users}>
      <Pagination totalCount = {props.totalUsersCount}
                  pageSize = {props.pageSize}
                  currentPage = {props.currentPage}
                  pageSelect = {props.pageSelect}
      />
      {props.users.map(u => <div className={styles.user} key={u.id}>
        <div className={styles.logoButtonWrapper}>
          <NavLink to={"/profile/"+u.id} className={styles.logoWrapper}>
            {/*<img className={styles.image} src={u.photos.small || randomFaceImage(u.id)} alt='userFace'/>*/}
            <img className={styles.image} src={u.photos.small || userNoImage} alt='userFace'/>
          </NavLink>
          <div>
            {
              u.followed ?
              <button className={styles.followButton + ' ' + styles.unfollow}
                      onClick={() => { props.unfollow(u.id) }}
              >Unfollow</button>
                :
              <button className={styles.followButton}
                      onClick={() => { props.follow(u.id) }}
              >Follow</button>
            }
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
      </div>)}
    </div>
    )
}


export default Users;
