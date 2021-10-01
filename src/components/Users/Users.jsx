import React from "react";
import styles from "./Users.module.css"
import {randomFaceImage} from "../../redux/randomFace";
import * as axios from "axios";
// import userNoImage from '../../assets/images/userNoImage.png'


const Users = (props) => {
  let getUsers = () => {
    if (props.users.length === 0) {
      axios.get('https://social-network.samuraijs.com/api/1.0/users')
        .then(response => {
          let users = response.data.items
          props.setUsers(users)
        })
    }
  }

  return (
    <div className={styles.users}>
    <button onClick={getUsers}>Get Users</button>
      {props.users.map(u => <div className={styles.user} key={u.id}>
        <div className={styles.logoButtonWrapper}>
          <div className={styles.logoWrapper}>
            <img className={styles.image}
                 src={u.photos.small||randomFaceImage(u.id)} alt='userFace'/>
          </div>
          <div>
            { u.followed ?
              <button className={styles.followButton+' '+styles.unfollow} onClick={()=> {props.unfollow(u.id)}}>Unfollow</button> :
              <button className={styles.followButton} onClick={()=> {props.follow(u.id)}}>Follow</button>
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
