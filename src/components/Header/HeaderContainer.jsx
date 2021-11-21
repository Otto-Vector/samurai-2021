import React from 'react';
import {connect} from "react-redux";
import {getAuth, loginOut} from "../../redux/auth-reducer";
import Header from "./Header";
import {getAuthorizedUserData, getIsAuthUser} from "../../reselect/auth-reselectors";


class HeaderContainer extends React.Component {

  componentDidMount() {
    this.props.getAuth()
  }

  loginOut = () => {
    this.props.loginOut()
  }

  render() {
    return <Header login={this.props.data.login}
                   id ={this.props.data.id}
                   isAuth ={this.props.isAuth}
                   loginOut ={this.loginOut}
    />

  }
}

let mapStateToProps = state => {
  return {
    data: getAuthorizedUserData(state),
    isAuth: getIsAuthUser(state),
  }
}


export default HeaderContainer = connect(mapStateToProps,
  {getAuth, loginOut})(HeaderContainer)

