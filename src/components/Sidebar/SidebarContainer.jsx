import Sidebar from "./Sidebar";
import {connect} from "react-redux";
import {getResponseFriends} from "../../redux/friends-reducer";
import {getFriendsHeader, getThreeFriendsRe} from "../../reselect/friends-selectors";

let mapStateToProps = (state) => {
  return {
    friends: getThreeFriendsRe(state),
    header: getFriendsHeader(state),
  }
}

const SidebarContainer = connect(mapStateToProps,{
  getResponseFriends,
})(Sidebar)

export default SidebarContainer
