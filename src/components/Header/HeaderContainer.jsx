import React from 'react';
import {connect} from "react-redux";
import {setAuthUserData} from "../../redux/auth-reducer";
import Header from "./Header";
import * as axios from "axios";


class HeaderContainer extends React.Component {

  getAuth = () => {
    axios.get(
      `https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true
      })
      .then(response => {
        if (response.data.resultCode === 0) {
          let data = response.data.data
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

