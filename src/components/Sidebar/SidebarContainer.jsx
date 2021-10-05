import Sidebar from "./Sidebar";
import {connect} from "react-redux";
import {onClickFriends} from "../../redux/sidebar-reducer";

let mapStateToProps = (state) => {
  return {
    friends: state.sidebar.friends,
    header: state.sidebar.header
  }
}

const SidebarContainer = connect(mapStateToProps,{
  onClickFriends
})(Sidebar)

export default SidebarContainer
