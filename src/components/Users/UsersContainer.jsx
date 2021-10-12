import React from "react";
import Users from "./Users";
import {
  changePage, follow, setTotalUsersCount,
  setUsers, toggleIsFetching, unfollow
} from "../../redux/users-reducer";
import {connect} from "react-redux";

import Preloader from "../common/Preloader/Preloader";
import {UsersAPI} from "../../api/samurai-api";


class UsersClassContainer extends React.Component {

  getUsers = (page) => {
    this.props.toggleIsFetching(true)

    UsersAPI.getUsers(this.props.pageSize,page)
        .then(response => {
          let users = response.items
          this.props.setUsers(users)

          if (!this.props.totalUsersCount)
            this.props.setTotalUsersCount(response.totalCount)

          this.props.toggleIsFetching(false)
        })
  }

  componentDidMount() {
    this.getUsers(this.props.currentPage)
  }

  // page = 0
  // componentDidUpdate() {
  //   console.log("Users updates now : ",this.page++," times")
  // }

  pageSelect = (page) => {
    this.props.changePage(page)
    this.getUsers(page)
  }

  render () {
    return <>

      {this.props.isFetching ? <Preloader /> : null}

      <Users users = {this.props.users}
                  totalUsersCount = {this.props.totalUsersCount}
                  pageSize = {this.props.pageSize}
                  currentPage = {this.props.currentPage}
                  follow = {this.props.follow}
                  unfollow = {this.props.unfollow}
                  pageSelect = {this.pageSelect}
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
    isFetching: state.usersPage.isFetching
  }
}


const UsersContainer = connect( mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    changePage,
    setTotalUsersCount,
    toggleIsFetching,
  })(UsersClassContainer)

export default UsersContainer;
