import React from 'react';
import styles from './sidebar.module.css';
import FriendItem from "./FriendItem/FriendItem";

const Sidebar = (props) => {

  let friendItem = props.friends.map((args)=><FriendItem key={Math.random()} {...args} />)

  return <div className={styles.sidebar}>
    <header className={styles.header}>Friends</header>
    <div className={styles.friendItems}>
      {friendItem}
    </div>
  </div>

}

export default Sidebar;
