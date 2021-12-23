import React from 'react';
import styles from './friendItem.module.css';
import {NavLink} from "react-router-dom";
import noImage from '../../../../assets/images/userNoImage.png'
import {UsersFromSearchType} from "../../../../redux/types/types";

type PropsType = UsersFromSearchType

const FriendItem = ({id, name, photos}:PropsType) => {
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
