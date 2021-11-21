import React from 'react';
import Login from "./Login";
import {connect} from "react-redux";
import {loginIn} from "../../redux/auth-reducer";
import {getAuthURL, getCaptchaUrl, getIsAuthUser} from "../../reselect/auth-reselectors";

class LoginContainer extends React.Component{

  render() {
    return <Login{...this.props}/>;
  }
}

let mapStateToProps = state => {
  return {
    isAuth: getIsAuthUser(state),
    authURL: getAuthURL(state),
    captchaUrl: getCaptchaUrl(state),
  }
}

export default LoginContainer = connect(mapStateToProps, {loginIn})(LoginContainer)
