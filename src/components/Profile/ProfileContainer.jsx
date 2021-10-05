import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfileState} from "../../redux/profile-reducer";
import * as axios from "axios";

class ProfileContainer extends React.Component {
  getProfile = (userId = 2) => {
        axios.get(
          `https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
          .then(response => {
            let profile = response.data
            this.props.setProfileState(profile)
          })
    }

  componentDidMount() {
    this.getProfile()
  }

  render() {return (<Profile {...this.props} />)}
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile
  }
}

export default ProfileContainer = connect(mapStateToProps, {setProfileState})(ProfileContainer);
