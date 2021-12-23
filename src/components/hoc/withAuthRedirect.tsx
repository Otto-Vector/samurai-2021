import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";
import {getAuthIsFetching, getIsAuthUser} from "../../reselect/auth-reselectors";


const authMapStateToProps = (state: AppStateType) => {
  return {
    isAuth: getIsAuthUser(state),
    isFetchingAuth: getAuthIsFetching(state),
  }
}

type MapStateToPropsType = ReturnType<typeof authMapStateToProps>

/* Если пользователь не авторизован, редиректит на Login
  а из логина редиректит на Profile */
const withAuthRedirect = (Component: any) => {

  const wrapperComponent: React.FC<MapStateToPropsType> = ({isFetchingAuth,isAuth, ...props}) => {

    if (isFetchingAuth) return <Preloader/>
    else if (!isAuth) return <Redirect to='/login'/>

    return <Component {...props}/>
  }

  return connect<MapStateToPropsType, {}, {}, AppStateType>(authMapStateToProps)(wrapperComponent)
}

export default withAuthRedirect
