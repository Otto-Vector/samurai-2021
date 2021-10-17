import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let authMapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

const withAuthRedirect = (Component) => {

  let wrapperComponent = (props) => {
    if (!props.isAuth) return <Redirect to='/login'/>
    return <Component {...props}/>
  }

  // let wrapperComponentWithAuth = connect(authMapStateToProps)(wrapperComponent)

  return connect(authMapStateToProps)(wrapperComponent)
}

export default withAuthRedirect
