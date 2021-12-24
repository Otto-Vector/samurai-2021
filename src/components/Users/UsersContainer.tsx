import React, {useEffect} from "react";
import Users from "./Users";
import {
  follow, getUsers, usersActions
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
  changePage: (page: number) => void
  getUsers: (pageSize: number, currentPage: number, isFriendsFilter?: boolean | null) => void
  friendsOnlyToggle: (isFriendsFilter: boolean | null) => void
}

type PropsType = MapStateToPropsType & DispatchToPropsType

const UsersContainer: React.FC<PropsType> = (
  {
    isFriendsFilter, isFetching, users, isFetchingById,
    totalUsersCount, pageSize, currentPage,
    //BLL
    follow, changePage, getUsers, friendsOnlyToggle,
  }) => {

  // toDo: add searchByName

  useEffect(() => {
    getUsers(pageSize, currentPage)
  }, [])


  const pageSelect = (page: number) => {
    changePage(page)
    getUsers(pageSize, page, isFriendsFilter)
  }

  const friendsFilerToggle = () => {
    changePage(1) // перемещаемся на первую страницу
    const isFriends = isFriendsFilter ? null : true //принимает только null, true или false(только не друзья
    friendsOnlyToggle(isFriends)
    getUsers(pageSize, 1, isFriends)

  }

  return <>
    <Users { ...{
      users,
      totalUsersCount,
      pageSize,
      currentPage,
      isFetchingById,
      isFriendsFilter,
      isFetching,
      follow,
      pageSelect,
      friendsFilerToggle,
    } }
    />
  </>
}

/////////////////////////////////////////////////////

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
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

const {changePage, friendsOnlyToggle} = usersActions

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, {
    follow,
    changePage,
    getUsers,
    friendsOnlyToggle
  }),
  withAuthRedirect
)(UsersContainer)
