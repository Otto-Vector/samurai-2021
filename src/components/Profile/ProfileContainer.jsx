import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfileState} from "../../redux/profile-reducer";
import * as axios from "axios";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {

  getProfile = (userId = 11) => {
        axios.get(
          `https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
          .then(response => {
            let profile = response.data
            this.props.setProfileState(profile)
          })
    }

  componentDidMount() {
    let userId = this.props.match.params.userId
    this.getProfile(userId)
  }

  render() {return (<Profile {...this.props} />)}
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile
  }
}

let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default ProfileContainer = connect(mapStateToProps, {setProfileState})(withUrlDataContainerComponent);
