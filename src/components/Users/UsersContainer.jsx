import React from "react";
import Users from "./Users";
import {
  changePage, follow, friendsOnlyToggle, getUsers, setUsers,
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import {compose} from "redux";

import withAuthRedirect from "../hoc/withAuthRedirect";


class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage)
  }


  pageSelect = (page) => {
    this.props.changePage(page)
    this.props.getUsers(this.props.pageSize, page, this.props.isFriendsFilter)
  }

  friendsFilerOn = ()=> {
    this.props.changePage(1)
    let isFriendsFilter = this.props.isFriendsFilter ? null : true
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
             friendsFilterOn={this.friendsFilerOn}
             isFetching={this.props.isFetching}
      />
    </>
  }
}

/////////////////////////////////////////////////////

let mapStateToProps = (state) => {
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
  connect(mapStateToProps, {
    follow,
    setUsers,
    changePage,
    getUsers,
    friendsOnlyToggle
  }),
  withAuthRedirect
)(UsersContainer)

