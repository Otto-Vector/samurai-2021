import React from 'react';
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import Header from "./Header";
import {AuthAPI} from "../../api/samurai-api";


class HeaderContainer extends React.Component {

  getAuth = () => {
    AuthAPI.getAuth()
      .then(response => {
        if (response.resultCode === 0) {
          let data = response.data
          this.props.setAuthUserData(data)
        }
      })
  }

  componentDidMount() {
    this.getAuth()
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


export default HeaderContainer = connect(mapStateToProps,
  {setAuthUserData})(HeaderContainer)

