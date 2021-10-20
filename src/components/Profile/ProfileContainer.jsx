import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

import Profile from "./Profile";
import {getProfile, getStatus} from "../../redux/profile-reducer";
import withAuthRedirect from "../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId || this.props.authUser || undefined
    // let userId = undefined
    this.props.getProfile(userId)
    this.props.getStatus(userId)
  }

  render() {
    return (<Profile {...this.props} />)
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    profileStatusText: state.profilePage.profileStatusText,
    profileStatusFetching: state.profilePage.profileStatusFetching,
    isFetching: state.profilePage.isFetching,
    authUser: state.auth.data.id,
    isAuth: state.auth.isAuth
  }
}

export default compose(
  connect(mapStateToProps, {
    getProfile,
    getStatus
  }),
  withAuthRedirect,
  withRouter
)(ProfileContainer)
