import React from 'react';
import styles from './friendsBar.module.css';
import FriendItem from "./FriendItem/FriendItem";
import Preloader from "../../common/Preloader/Preloader";
import { SidebarContainerType } from '../SidebarContainer';
import withAuthNotShown from "../../hoc/withAuthNotShown";


const FriendsBar: React.FC<SidebarContainerType> = (
  {getResponseFriends, isFetching, friends, header} ) => {

  if (isFetching) return <Preloader />

  const friendItem = friends.map( (args) => <FriendItem key={args.id} {...args} />)

  return <div className={ styles.friendsBar }>
    <div className={ styles.headerWrapper }>
      <header className={ styles.header }>{ header }</header>
      <button className={ styles.refreshButton }
              onClick={()=>{ getResponseFriends() }
              }>Refresh</button>
    </div>
    <div className={ styles.friendItems }>
      { friendItem }
    </div>
  </div>
}

// не отображать друзей, если не авторизован
const withAuthFriendsBar: React.FC<SidebarContainerType> = withAuthNotShown(FriendsBar)

export default withAuthFriendsBar;
