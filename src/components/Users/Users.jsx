import React from "react";
import styles from "./Users.module.css"
// import {randomFaceImage} from "../../redux/randomFace";
import userNoImage from '../../assets/images/userNoImage.png'


const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    // let pagesCount = Math.ceil(100 / props.pageSize)
    let pages = []
    for (let i=1; i<= pagesCount; i++) {
      pages.push(i)
    }

    return (
    <div className={styles.users}>
      <div className={styles.pagination}>
        {
          pages.map(p => {
            return <span
              key = {p*0.3}
              className={`${styles.page} ${props.currentPage===p && styles.selectedPage}`}
              onClick={ (e)=>{ props.pageSelect(p) } }
            >{p}</span>
        })
        }
      </div>
      {props.users.map(u => <div className={styles.user} key={u.id}>
        <div className={styles.logoButtonWrapper}>
          <div className={styles.logoWrapper}>
            {/*<img className={styles.image} src={u.photos.small || randomFaceImage(u.id)} alt='userFace'/>*/}
            <img className={styles.image} src={u.photos.small || userNoImage} alt='userFace'/>
          </div>
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
