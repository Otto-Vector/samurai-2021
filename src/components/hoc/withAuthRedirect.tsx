import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {getAuthIsFetching, getIsAuthUser} from "../../reselect/auth-reselectors";


type MapStateToPropsType = {
  isAuth: boolean
  isFetchingAuth: boolean
}

const authMapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    isAuth: getIsAuthUser(state),
    isFetchingAuth: getAuthIsFetching(state),
  }
}

const withAuthRedirect = (Component: any) => {

  const wrapperComponent = (props: MapStateToPropsType) => {

    if (props.isFetchingAuth) return <Preloader/>
    else if (!props.isAuth) return <Redirect to='/login'/>

    return <Component {...props}/>
  }

  return connect<MapStateToPropsType, {}, {}, AppStateType>(authMapStateToProps)(wrapperComponent)
}

export default withAuthRedirect
