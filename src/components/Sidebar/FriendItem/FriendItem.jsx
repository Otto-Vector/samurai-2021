import React from 'react';
import styles from './friendItem.module.css';
import {NavLink} from "react-router-dom";

const FriendItem = (props) => {
  let path = "/profile/" + props.id;

  return <div className={styles.friendItem}>
      <img className={styles.image} alt="dialogImage" src={props.imageURL}/>
      <NavLink to={path} className={styles.name}>{props.name}</NavLink>
  </div>

}

export default FriendItem;
