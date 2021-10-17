import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader";

let authMapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    isFetchingAuth: state.auth.isFetching,
  }
}

const withAuthRedirect = (Component) => {

  let wrapperComponent = (props) => {

    if (props.isFetchingAuth) return <Preloader/>
    else if (!props.isAuth) return <Redirect to='/login'/>

    return <Component {...props}/>
  }

  return connect(authMapStateToProps)(wrapperComponent)
}

export default withAuthRedirect
