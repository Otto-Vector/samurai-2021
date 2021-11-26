import React from "react";
import Users from "./Users";
import {
  changePage, follow, friendsOnlyToggle, getUsers,
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import {compose} from "redux";

import withAuthRedirect from "../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/redux-store";
import {UsersFromSearchType} from "../../redux/types/types";


type MapStateToPropsType = {
    isFriendsFilter: boolean | null
    isFetching: boolean
    users: UsersFromSearchType[]
    isFetchingById: number[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
}

type DispatchToPropsType = {
  follow: (isFollow: boolean, userId: number) => void
  changePage: (page : number) => void
  getUsers: (pageSize: number, currentPage: number, isFriendsFilter?: boolean | null) => void
  friendsOnlyToggle: (isFriendsFilter: boolean | null) => void
}

type PropsType = MapStateToPropsType & DispatchToPropsType

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage)
  }


  pageSelect = (page: number) => {
    this.props.changePage(page)
    this.props.getUsers(this.props.pageSize, page, this.props.isFriendsFilter)
  }

  friendsFilerToggle = () => {
    this.props.changePage(1) // перемещаемся на первую страницу
    const isFriendsFilter = this.props.isFriendsFilter ? null : true //принимает только null или true
    this.props.friendsOnlyToggle(isFriendsFilter)
    this.props.getUsers(this.props.pageSize, 1, isFriendsFilter)

  }

  render() {
    return <>
      <Users users={this.props.users}
             totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             follow={this.props.follow}
             pageSelect={this.pageSelect}
             isFetchingById={this.props.isFetchingById}
             isFriendsFilter={this.props.isFriendsFilter}
             friendsFilerToggle={this.friendsFilerToggle}
             isFetching={this.props.isFetching}
      />
    </>
  }
}

/////////////////////////////////////////////////////

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    isFetchingById: state.usersPage.isFetchingById,
    isFriendsFilter: state.usersPage.isFriendsFilter
  }
}



export default compose(
  connect<MapStateToPropsType, DispatchToPropsType,{},AppStateType>(mapStateToProps, {
    follow,
    changePage,
    getUsers,
    friendsOnlyToggle
  }),
  withAuthRedirect
)(UsersContainer)
