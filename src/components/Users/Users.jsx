import React from "react";
import styles from "./Users.module.css"
// import {randomFaceImage} from "../../redux/randomFace";
import * as axios from "axios";
import userNoImage from '../../assets/images/userNoImage.png'


class Users extends React.Component {


  getUsers = (page) => {
      axios.get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${
          this.props.pageSize}&page=${page}`)
        .then(response => {
          let users = response.data.items
          this.props.setUsers(users)
          if (this.props.totalUsersCount === 0) this.props.setTotalUsersCount(response.data.totalCount)
        })
  }


  componentDidMount() {
    this.getUsers(this.props.currentPage)
  }

  componentDidUpdate() {
    console.log("Total USERS is ", this.props.totalUsersCount)
    console.log("Users updates now : ",this.page++," times")
  }

  pageSelect = (page) => {
    this.props.changePage(page)
    this.getUsers(page)
  }

  render () {
    let pagesCount = Math.ceil(100 / this.props.pageSize)
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
              className={`${styles.page} ${this.props.currentPage===p && styles.selectedPage}`}
              onClick={(e)=>{this.pageSelect(p)}}
            >{p}</span>
        })
        }
      </div>
      {this.props.users.map(u => <div className={styles.user} key={u.id}>
        <div className={styles.logoButtonWrapper}>
          <div className={styles.logoWrapper}>
            {/*<img className={styles.image} src={u.photos.small || randomFaceImage(u.id)} alt='userFace'/>*/}
            <img className={styles.image} src={u.photos.small || userNoImage} alt='userFace'/>
          </div>
          <div>
            {u.followed ?
              <button className={styles.followButton + ' ' + styles.unfollow} onClick={() => {
                this.props.unfollow(u.id)
              }}>Unfollow</button> :
              <button className={styles.followButton} onClick={() => {
                this.props.follow(u.id)
              }}>Follow</button>
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

}


export default Users;
