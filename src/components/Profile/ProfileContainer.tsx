import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter, RouteComponentProps} from "react-router-dom";

import Profile from "./Profile";
import {
  getProfile,
  setPhoto,
  setProfileData,
  getStatus,
  ProfileThunkActionType,
  profileActions
} from "../../redux/profile-reducer";
import {getAuthorizedUserDataId, getIsAuthUser} from "../../reselect/auth-reselectors";
import {
  // getErrorFromApi,
  getProfileData,
  getProfileIsAuth,
  getProfileIsFetching
} from "../../reselect/profile-selectors";
import {ProfileType} from "../../redux/types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
  isAuth: boolean
  authUserId: number | null
  profile: ProfileType | null
  isFetching: boolean
  isAuthProfile: boolean
}

type MapDispatchType = {
  getProfile: (userId: number) => void
  setIsAuthProfile: (isAuthProfile: boolean) => void
  getStatus: (userId: number) => void
  setPhoto: (userPhoto: File) => void
  setProfileData: (data: ProfileType) => ProfileThunkActionType<string[] | null> | Promise<string[] | null>
}

type OwnProps = {
  // unlisten: any
}

type RouteProps = {
  userId?: string
}

type ProfileContainerType = MapStatePropsType & MapDispatchType & OwnProps & RouteComponentProps<RouteProps>

class ProfileContainer extends React.Component<ProfileContainerType> {

  private unlisten: any;

  updateProfile() {
    let idFromRouter = +(this.props.match.params.userId || "0")
    let authUsId = +(this.props.authUserId || "0")
    let userId = idFromRouter || authUsId
    let isAuthProfile = (userId === authUsId)

    this.props.setIsAuthProfile(isAuthProfile)
    this.props.getProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    //подгружаем профайл при монтировке
    this.updateProfile()
    //при изменении данных в поле адреса - жёсткий перезапуск :)
    this.unlisten = this.props.history.listen(() => {
      this.forceUpdate()
    });
  }

  componentDidUpdate(prevProps: ProfileContainerType, prevState: ProfileContainerType) {
    //обновляем при изменении
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.updateProfile()
    }
  }

  componentWillUnmount() {
    this.unlisten()
  }

  render() {
    return (<Profile profile={ this.props.profile }
                     isAuthProfile={ this.props.isAuthProfile }
                     isFetching={ this.props.isFetching }
                     setPhoto={ this.props.setPhoto }
                     setProfileData={ this.props.setProfileData }
    />)
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: getIsAuthUser(state),
    authUserId: getAuthorizedUserDataId(state),
    profile: getProfileData(state),
    isFetching: getProfileIsFetching(state),
    isAuthProfile: getProfileIsAuth(state),
    // errorsFromApi: getErrorFromApi(state)
  }
}

const {setIsAuthProfile} = profileActions

export default compose(
  connect<MapStatePropsType, MapDispatchType, OwnProps, AppStateType>(mapStateToProps, {
    getProfile,
    setIsAuthProfile,
    getStatus,
    setPhoto,
    setProfileData
  }),
  // withAuthRedirect,
  withRouter
)(ProfileContainer)
