import Sidebar from "./Sidebar";
import {connect} from "react-redux";
import {getResponseFriends} from "../../redux/friends-reducer";
import {getFriendsHeader, getFriendsIsFetching, getAnyFriendsReselect} from "../../reselect/friends-selectors";
import {compose} from "redux";
// import withAuthRedirect from "../hoc/withAuthRedirect";
import withAuthNotShown from "../hoc/withAuthNotShown";
import {AppStateType} from "../../redux/redux-store";
import {UsersFromSearchType} from "../../redux/types/types";

type MapStatePropsType = {
  friends: UsersFromSearchType[]
  header: string
  isFetching: boolean
}

type DispatchPropsType = {
  getResponseFriends: ()=> void
}

export type SidebarContainerType = MapStatePropsType & DispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    friends: getAnyFriendsReselect(state),
    header: getFriendsHeader(state),
    isFetching: getFriendsIsFetching(state),
  }
}


const SidebarContainer: any = compose(
  connect<MapStatePropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps,{ getResponseFriends }),
  withAuthNotShown,
)(Sidebar)


export default SidebarContainer
