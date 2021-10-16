import React from 'react';
import {connect} from "react-redux";
import {getAuth} from "../../redux/auth-reducer";
import Header from "./Header";


class HeaderContainer extends React.Component {

  componentDidMount() {
    this.props.getAuth()
  }

  render() {
    return <Header {...this.props.data} />

  }
}

let mapStateToProps = (state) => {
  return {
    data: state.auth.data

  }
}


export default HeaderContainer = connect(mapStateToProps,{getAuth})(HeaderContainer)

