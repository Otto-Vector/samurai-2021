import React from 'react';
import styles from './friendItem.module.css';
import {NavLink} from "react-router-dom";
import noImage from '../../../assets/images/userNoImage.png'

const FriendItem = ({id, name, photos}) => {
  let path = "/profile/" + id;
  return <div className={styles.friendItem}>
    <NavLink to={path}>
      <img
           className={styles.image}
           alt={'friendImg'}
           title={name}
           src={photos.small || noImage}
      />
      {/*<div className={styles.name}>{name}</div>*/}
    </NavLink>
  </div>

}

export default FriendItem;
