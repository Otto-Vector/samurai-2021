import React from "react";
import Users from "./Users";
import {
  changePage, follow, getUsers, setUsers,
} from "../../redux/users-reducer";
import {connect} from "react-redux";

import Preloader from "../common/Preloader/Preloader";


class UsersClassContainer extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.pageSize, this.props.currentPage)
  }

  // page = 0
  // componentDidUpdate() {
  //   console.log("Users updates now : ",this.page++," times")
  // }

  pageSelect = (page) => {
    this.props.changePage(page)
    this.props.getUsers(this.props.pageSize,page)
  }

  render () {
    return <>

      {this.props.isFetching ? <Preloader /> : null}

      <Users users = {this.props.users}
                  totalUsersCount = {this.props.totalUsersCount}
                  pageSize = {this.props.pageSize}
                  currentPage = {this.props.currentPage}
                  follow = {this.props.follow}
                  pageSelect = {this.pageSelect}
                  isFetchingById = {this.props.isFetchingById}
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
    isFetchingById: state.usersPage.isFetchingById
  }
}


const UsersContainer = connect( mapStateToProps, {
    follow,
    setUsers,
    changePage,
    getUsers
  })(UsersClassContainer)

export default UsersContainer;
