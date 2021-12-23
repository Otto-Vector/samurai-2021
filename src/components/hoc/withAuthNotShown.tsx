import React from 'react';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
  isAuth: boolean
}

const authMapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
  }
}

const withAuthNotShown = (Component: any) => {
  const wrapperComponent = ({isAuth, ...props}: MapStateToPropsType) => {
    return !isAuth ? <div>Authorize please</div> : <Component {...props}/>
  }
  return connect<MapStateToPropsType, {}, {}, AppStateType>(authMapStateToProps)(wrapperComponent)
}

export default withAuthNotShown
