import React from "react";
import styles from "./UserItem.module.css"
import userNoImage from '../../../assets/images/userNoImage.png'
import {NavLink} from "react-router-dom";
import {UsersFromSearchType} from "../../../redux/types/types";

type PropsType = {
    isFetchingById: number[]
    follow: (followed: boolean, id: number) => void
}

export type UserItemType = UsersFromSearchType & PropsType

const UserItem = ({id, photos, isFetchingById, followed, follow, name, status}:UserItemType) => {

  return (
    <div className={styles.user}>
      <div className={styles.logoButtonWrapper}>
        <NavLink to={"/profile/" + id} className={styles.logoWrapper}>
          <img className={styles.image} src={photos.small || userNoImage} alt='userFace'/>
        </NavLink>
        <div>
          <button disabled={isFetchingById.includes(id)}
                  className={styles.followButton + ' ' + styles[followed ? 'unfollow' : 'follow']}
                  onClick={() => {
                    follow(followed, id)
                  }}
          >{followed ? 'unfollow' : 'follow'}</button>
        </div>
      </div>
      <div className={styles.userInfoWrapper}>
        <div className={styles.userNameStatusWrapper}>
          <div className={styles.userFullname}>{name}</div>
          <div className={styles.userStatus}>{status}</div>
        </div>
        <div className={styles.locationWrapper}>
          <div>{"u.location.country+','"}</div>
          <div>{"u.location.city"}</div>
        </div>
      </div>
    </div>)
}

export default UserItem;
