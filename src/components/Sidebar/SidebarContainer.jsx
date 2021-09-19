import Sidebar from "./Sidebar";
import {connect} from "react-redux";
import {onClickFriendsActionCreator} from "../../redux/sidebar-reducer";

let mapStateToProps = (state) => {
  return {
    friends: state.sidebar.friends,
    header: state.sidebar.header
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onClickFriends: (id) => {
      dispatch(onClickFriendsActionCreator(id));
    },

  }
}

const SidebarContainer = connect(mapStateToProps,mapDispatchToProps)(Sidebar)

export default SidebarContainer
