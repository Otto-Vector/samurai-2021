import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfileState} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {ProfileAPI} from "../../api/samurai-api";

class ProfileContainer extends React.Component {

  getProfile = (userId = 11) => {
        ProfileAPI.getProfile(userId)
          .then(this.props.setProfileState)
          // .then(response => { this.props.setProfileState(response)})
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
