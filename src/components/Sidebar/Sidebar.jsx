import React from 'react';
import styles from './sidebar.module.css';
import FriendItem from "./FriendItem/FriendItem";
import Preloader from "../common/Preloader/Preloader";

const Sidebar = (props) => {

  let header = props.header

  let refreshFriends = () => {
    props.getResponseFriends()
  }

  let friendItem = props.friends.map( args => <FriendItem key={Math.random()} {...args} />)

  if (props.isFetching) return <Preloader />

  return <div className={styles.sidebar}>
    <div className={styles.headerWrapper}>
      <header className={styles.header}>{header}</header>
      <button className={styles.refreshButton} onClick={refreshFriends}>Refresh</button>
    </div>
    <div className={styles.friendItems}>
      {friendItem}
    </div>
  </div>
}

export default Sidebar;
