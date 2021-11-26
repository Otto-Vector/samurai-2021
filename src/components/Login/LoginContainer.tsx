import React from 'react';
import Login from "./Login";
import {connect} from "react-redux";
import {loginIn} from "../../redux/auth-reducer";
import {getAuthURL, getCaptchaUrl, getIsAuthUser} from "../../reselect/auth-reselectors";
import {AppStateType} from "../../redux/redux-store";
import {AuthDataType} from "../../redux/types/types";

type MapStatePropsType = {
    isAuth: boolean
    authURL: string
    captchaUrl: string | null
}

type DispatchPropsType = {
  loginIn: (loginData : AuthDataType) => void
}

export type LoginContainerType = MapStatePropsType & DispatchPropsType

const LoginContainer = (props: LoginContainerType) =>{

  return <Login{...props}/>;

}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: getIsAuthUser(state),
    authURL: getAuthURL(state),
    captchaUrl: getCaptchaUrl(state),
  }
}

export default connect<MapStatePropsType, DispatchPropsType, {}, AppStateType>
(mapStateToProps, {loginIn})(LoginContainer)
