import React from 'react';
import styles from './sidebar.module.css';
import FriendItem from "./FriendItem/FriendItem";

const Sidebar = (props) => {

  let header = props.header

  let onClickFriends = (id) => {
    props.onClickFriends(id)
  }

  let friendItem = props.friends.map((args)=><FriendItem key={Math.random()} {...args}
                                                         onClickFriends={onClickFriends}/>)

  return <div className={styles.sidebar}>
    <header className={styles.header}>{header}</header>
    <div className={styles.friendItems}>
      {friendItem}
    </div>
  </div>
}

export default Sidebar;
