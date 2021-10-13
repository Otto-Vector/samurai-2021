import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";


class ProfileContainer extends React.Component {


  componentDidMount() {
    let userId = this.props.match.params.userId
    this.props.getProfile(userId)
  }

  render() {return (<Profile {...this.props} />)}
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching
  }
}

let withUrlDataContainerComponent = withRouter(ProfileContainer);

export default ProfileContainer = connect(mapStateToProps, {getProfile})(withUrlDataContainerComponent);
