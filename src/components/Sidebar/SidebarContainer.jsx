import Sidebar from "./Sidebar";
import {connect} from "react-redux";
import {getResponseFriends} from "../../redux/friends-reducer";
import {getFriendsHeader, getFriendsIsFetching, getAnyFriendsReselect} from "../../reselect/friends-selectors";
import {compose} from "redux";
// import withAuthRedirect from "../hoc/withAuthRedirect";
import withAuthNotShown from "../hoc/withAuthNotShown";

let mapStateToProps = state => {
  return {
    friends: getAnyFriendsReselect(state),
    header: getFriendsHeader(state),
    isFetching: getFriendsIsFetching(state),
  }
}


const SidebarContainer = compose(
  connect(mapStateToProps,{ getResponseFriends }),
  withAuthNotShown,
)(Sidebar)

export default SidebarContainer
