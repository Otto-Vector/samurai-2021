import React from 'react';
import Login from "./Login";
import {connect} from "react-redux";

class LoginContainer extends React.Component{
  render() {
    return <Login{...this.props}/>;
  }
}

let mapStateToProps = (state) => {
  return {
    authURL: state.login.authURL
  }
}

export default LoginContainer = connect(mapStateToProps)(LoginContainer)
