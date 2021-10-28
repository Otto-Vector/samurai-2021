import React from 'react';
import Login from "./Login";
import {connect} from "react-redux";
import {loginIn} from "../../redux/auth-reducer";

class LoginContainer extends React.Component{

  render() {
    return <Login{...this.props}/>;
  }
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    authURL: state.auth.authURL,
    errorMessages: state.auth.errorMessages
  }
}

export default LoginContainer = connect(mapStateToProps, {loginIn})(LoginContainer)
