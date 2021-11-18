import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

import Profile from "./Profile";
import {getProfile, setIsAuthProfile, setPhoto, setProfileData, getStatus} from "../../redux/profile-reducer";


class ProfileContainer extends React.Component {

  updateProfile() {
    let idFromRouter = this.props.match.params.userId
    let userId = idFromRouter || this.props.authUser || undefined
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
