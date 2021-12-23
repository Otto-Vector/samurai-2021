import Navbar from "./Navbar/Navbar";
import FriendsBar from "./FriendBar/FriendsBar";
import {connect} from "react-redux";
import {getResponseFriends} from "../../redux/friends-reducer";
import {getFriendsHeader, getFriendsIsFetching, getAnyFriendsReselect} from "../../reselect/friends-selectors";

import {AppStateType} from "../../redux/redux-store";
import classes from "./sidebar.module.css";


type MapStatePropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  getResponseFriends: ()=> void
}

export type SidebarContainerType = MapStatePropsType & DispatchPropsType

const Sidebar: React.FC<SidebarContainerType> = (
  {friends,header, isFetching, getResponseFriends}) => {
  return <div className={classes.sidebar}>
    <Navbar/>
    <div className={classes.delimiter}> </div>
    <FriendsBar friends={friends}
                header={header}
                isFetching={isFetching}
                getResponseFriends={getResponseFriends}
    />
  </div>
}


const mapStateToProps = (state: AppStateType) => {
  return {
    friends: getAnyFriendsReselect(state),
    header: getFriendsHeader(state),
    isFetching: getFriendsIsFetching(state),
  }
}

const SidebarContainer = connect<MapStatePropsType, DispatchPropsType, {}, AppStateType>(
  mapStateToProps,{ getResponseFriends })(Sidebar)

export default SidebarContainer
