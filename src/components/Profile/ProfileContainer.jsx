import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

import Profile from "./Profile";
import {getProfile, getStatus, setIsAuthProfile, setStatusProfile, updateStatus} from "../../redux/profile-reducer";
import withAuthRedirect from "../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {


  componentDidMount() {
    // let userId = undefined
    let userId = this.props.match.params.userId || this.props.authUser || undefined
    let bool = (+userId === +this.props.authUser)
    this.props.setIsAuthProfile(bool)
    this.props.getProfile(userId)
    this.props.getStatus(userId)
    // debugger
  }

  componentDidUpdate() {
  }

  render() {
    return (<Profile {...this.props} isAuthProfile = {this.props.isAuthProfile} />)
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    profileStatusText: state.profilePage.profileStatusText,
    profileStatusFetching: state.profilePage.profileStatusFetching,
    isFetching: state.profilePage.isFetching,
    authUser: state.auth.data.id,
    isAuth: state.auth.isAuth,
    isAuthProfile: state.profilePage.isAuthProfile
  }
}

export default compose(
  connect(mapStateToProps, {
    getProfile,
    getStatus,
    updateStatus,
    setStatusProfile,
    setIsAuthProfile,
  }),
  withAuthRedirect,
  withRouter
)(ProfileContainer)
