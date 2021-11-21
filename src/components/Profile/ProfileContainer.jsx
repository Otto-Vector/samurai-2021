import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

import Profile from "./Profile";
import {getProfile, setIsAuthProfile, setPhoto, setProfileData, getStatus} from "../../redux/profile-reducer";
import {getAuthorizedUserDataId, getIsAuthUser} from "../../reselect/auth-reselectors";
import {getProfileData, getProfileIsAuth, getProfileIsFetching} from "../../reselect/profile-selectors";


class ProfileContainer extends React.Component {

  updateProfile() {
    let idFromRouter = this.props.match.params.userId
    let userId = idFromRouter || this.props.authUserId || undefined
    let isAuthProfile = (+userId === +this.props.authUserId)

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
    />)
  }
}

let mapStateToProps = state => {
  return {
    isAuth: getIsAuthUser(state),
    authUserId: getAuthorizedUserDataId(state),
    profile: getProfileData(state),
    isFetching: getProfileIsFetching(state),
    isAuthProfile: getProfileIsAuth(state),
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
