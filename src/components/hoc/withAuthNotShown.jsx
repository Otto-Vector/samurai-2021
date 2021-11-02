import React from 'react';
// import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader";

let authMapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    isFetchingAuth: state.auth.isFetching,
  }
}

const withAuthNotShown = (Component) => {

  let wrapperComponent = (props) => {

    if (props.isFetchingAuth) return <Preloader/>
    else if (!props.isAuth) return <div>Authorize please</div>

    return <Component {...props}/>
  }

  return connect(authMapStateToProps)(wrapperComponent)
}

export default withAuthNotShown
