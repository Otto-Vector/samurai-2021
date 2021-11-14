import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

import Profile from "./Profile";
import {getProfile, setIsAuthProfile, setPhoto, setProfileData} from "../../redux/profile-reducer";
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
    //подгружаем профайл при монтировке
    this.updateProfile()
    //при изменении данных в поле адреса - жёсткий перезапуск :)
    this.unlisten = this.props.history.listen( () =>  { this.forceUpdate() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //обновляем при изменении
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.updateProfile()
    }
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    return (<Profile {...this.props}
                     // isAuthProfile = {this.props.isAuthProfile}
    />)
  }
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    authUser: state.auth.data.id,
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
    isAuthProfile: state.profilePage.isAuthProfile,
    errorMessage: state.profilePage.errorMessage,
  }
}

export default compose(
  connect(mapStateToProps, {
    getProfile,
    setIsAuthProfile,
    getStatus,
    setPhoto,
    setProfileData
  }),
  // withAuthRedirect,
  withRouter
)(ProfileContainer)
