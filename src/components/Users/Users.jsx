import React from "react";
import styles from "./Users.module.css"
import {randomFaceImage} from "../../redux/randomFace";

const Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers(
      [
        {
          id: 1, followed: false, imageUrl: randomFaceImage(1), fullName: 'Hillary',
          status: 'I`m a boss', location: {city: 'Minsk', country: 'Belarus'},
        },
        {
          id: 2, followed: true, imageUrl: randomFaceImage(2), fullName: 'Member',
          status: 'I`m a clever', location: {city: 'Omsk', country: 'Russia'},
        },
        {
          id: 3, followed: true, imageUrl: randomFaceImage(3), fullName: 'Sergio',
          status: 'I`m a batty', location: {city: 'Moscow', country: 'Russia'},
        },
        {
          id: 4, followed: false, imageUrl: randomFaceImage(4), fullName: 'Worker',
          status: 'I`m a miner', location: {city: 'Nalchik', country: 'Russia'},
        },
        {
          id: 5, followed: false, imageUrl: randomFaceImage(5), fullName: 'Understander',
          status: 'I`m a levelUp!', location: {city: 'Kiev', country: 'Ukraine'},
        },
      ]
    )
  }
  return (
    <div className={styles.users}>
      {props.users.map(u => <div key={u.id}>
        <span>
          <div >
            <img className={styles.image} src={u.imageUrl} alt='userFace'/>
          </div>
          <div>

            { u.followed ?
              <button onClick={()=> {props.unfollow(u.id)}}>Unfollow</button> :
              <button onClick={()=> {props.follow1(u.id)}}>Follow</button>
            }
          </div>
        </span>
        <span>
          <span>
            <div>{u.fullName}</div>
            <div>{u.status}</div>
          </span>
          <span>
            <div>{u.location.country}</div>
            <div>{u.location.city}</div>
          </span>
        </span>
      </div>)}
    </div>
  )
}


export default Users;
