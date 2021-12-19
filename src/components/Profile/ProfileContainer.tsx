import React, {useEffect, useState} from 'react';
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

const ProfileContainer: React.FC<ProfileContainerType> = (
  { // state переменные
    authUserId, profile, isAuthProfile, isFetching,
    // BLL
    setPhoto, setProfileData, setIsAuthProfile, getProfile, getStatus,
    // whithRouter
    history, match
  }) => {

  // присваиваем первое значение из роутера
  // и меняем пользователя внутри компоненты, пока она живёт
  let [userID, changeUserID] = useState(+(match.params.userId || "0"))

  // по умолчанию, всегда берёт активный userID
  const updateProfile = (idFromRouter = userID) => {

    authUserId = +(authUserId || 0)
    let userId = idFromRouter || authUserId

    setIsAuthProfile(userId === authUserId)
    getProfile(userId)
    getStatus(userId)
  }

  useEffect(() => {
    // загружаем данные пользователя в UI
    updateProfile()
    // создаём прослушку истории браузера
    const unlisten = history.listen(({pathname}) => {
      // преображаем id пользователя в число
      let idFromRoute = +pathname.split('/').reverse()[0]
      // изменяем значение id пользователя
      changeUserID(idFromRoute)
    });
    // отписываемся от прослушки истории
    return () => {
      unlisten()
    }
  }, [userID]) // запускается при каждом изменении userID

  // передаваемые переменные
  const referenceProps = {
    profile,
    isAuthProfile,
    isFetching,
    setPhoto,
    setProfileData
  }
  return (<Profile  { ...referenceProps }/>)

}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: getIsAuthUser(state),
    authUserId: getAuthorizedUserDataId(state),
    profile: getProfileData(state),
    isFetching: getProfileIsFetching(state),
    isAuthProfile: getProfileIsAuth(state),
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
