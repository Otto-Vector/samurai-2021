import React from 'react';
import styles from './friendItem.module.css';
import {NavLink} from "react-router-dom";
import noImage from '../../../assets/images/userNoImage.png'

const FriendItem = props => {
  let path = "/profile/" + props.id;
  return <div className={styles.friendItem}>
    <NavLink to={path}>
      <img
        // onClick={()=>{props.onClickFriends(props.id)}}
           className={styles.image}
           alt={"friend " + props.id}
           src={props.photos.small || noImage}/>
      <div className={styles.name}>{props.name}</div>
    </NavLink>
  </div>

}

export default FriendItem;
