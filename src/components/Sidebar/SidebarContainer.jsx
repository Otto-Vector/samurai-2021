import Sidebar from "./Sidebar";
import {connect} from "react-redux";
import {getResponseFriends} from "../../redux/friends-reducer";
import {getFriendsHeader, getFriendsIsFetching, getThreeFriendsRe} from "../../reselect/friends-selectors";
import {compose} from "redux";
import withAuthNotShown from "../hoc/withAuthNotShown";

let mapStateToProps = (state) => {
  return {
    friends: getThreeFriendsRe(state),
    header: getFriendsHeader(state),
    isFetching: getFriendsIsFetching(state)
  }
}


const SidebarContainer = compose(
  connect(mapStateToProps,{ getResponseFriends }),
  withAuthNotShown,
)(Sidebar)

export default SidebarContainer
