import React from "react";
import Users from "./Users";
import {
  changePageActionCreator,
  followActionCreator, setTotalUsersCountActionCreator,
  setUsersActionCreator,
  unfollowActionCreator
} from "../../redux/users-reducer";
import {connect} from "react-redux";

import * as axios from "axios";


class UsersClassContainer extends React.Component {

  getUsers = (page) => {
      axios.get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${
          this.props.pageSize}&page=${page}`)
        .then(response => {
          let users = response.data.items
          this.props.setUsers(users)
          if (!this.props.totalUsersCount)
            this.props.setTotalUsersCount(response.data.totalCount)
        })
  }


  componentDidMount() {
    this.getUsers(this.props.currentPage)
  }

  page = 0
  componentDidUpdate() {
    console.log("Users updates now : ",this.page++," times")
  }

  pageSelect = (page) => {
    this.props.changePage(page)
    this.getUsers(page)
  }

  render () { return <Users
    users = {this.props.users}
    totalUsersCount = {this.props.totalUsersCount}
    pageSize = {this.props.pageSize}
    currentPage = {this.props.currentPage}
    follow={this.props.follow}
    unfollow={this.props.unfollow}
    pageSelect = {this.pageSelect}
  />}
}



let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followActionCreator(userId))
    },
    unfollow: (userId) => {
      dispatch(unfollowActionCreator(userId))
    },
    setUsers: (users) => {
      dispatch(setUsersActionCreator(users))
    },
    changePage: (page) => {
      dispatch(changePageActionCreator(page))
    },
    setTotalUsersCount: (totalUsersCount) => {
      dispatch(setTotalUsersCountActionCreator(totalUsersCount))
    }
  }
}

const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(UsersClassContainer)

export default UsersContainer;
