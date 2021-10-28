import React from 'react';
import {connect} from "react-redux";
import {getAuth, loginOut} from "../../redux/auth-reducer";
import Header from "./Header";


class HeaderContainer extends React.Component {

  componentDidMount() {
    this.props.getAuth()
  }

  render() {
    return <Header login={this.props.data.login}
                   id ={this.props.data.id}
                   isAuth ={this.props.isAuth}
                   loginOut ={this.props.loginOut}
    />

  }
}

let mapStateToProps = (state) => {
  return {
    data: state.auth.data,
    isAuth: state.auth.isAuth,
  }
}


export default HeaderContainer = connect(mapStateToProps,
  {getAuth, loginOut})(HeaderContainer)

