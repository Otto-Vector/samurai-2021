import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

import Profile from "./Profile";
import {getProfile, setIsAuthProfile, setPhoto} from "../../redux/profile-reducer";
import {getStatus} from "../../redux/status-reduser";
// import withAuthRedirect from "../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {

  updateProfile() {
    let userId = this.props.match.params.userId || this.props.authUser || undefined
    let isAuthProfile = (+userId === +this.props.authUser)
    this.props.setIsAuthProfile(isAuthProfile)
    this.props.getProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    // this.unlisten = this.props.history.listen( location =>  {
    //             console.log('route changes to : ', location);
    //             // this.props.history.push(location.pathname);
    //             console.log('userId is : ', this.props.match.params.userId);
    //        });
    this.updateProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.updateProfile()
    }
  }

  componentWillUnmount() {
    // this.unlisten()
  }

  render() {
    return (<Profile {...this.props}
                     // isAuthProfile = {this.props.isAuthProfile}
    />)
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
    authUser: state.auth.data.id,
    isAuth: state.auth.isAuth,
    isAuthProfile: state.profilePage.isAuthProfile
  }
}

export default compose(
  connect(mapStateToProps, {
    getProfile,
    setIsAuthProfile,
    getStatus,
    setPhoto,
  }),
  // withAuthRedirect,
  withRouter
)(ProfileContainer)
