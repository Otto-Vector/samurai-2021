import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import withAuthRedirect from "../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId || this.props.authUser || undefined
    this.props.getProfile(userId)
  }

  render() {
    // if (!this.props.isAuth) return <Redirect to='/login' />
    return (<Profile {...this.props} />)
  }
}

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
    authUser: state.auth.data.id,
    isAuth: state.auth.isAuth
  }
}

let withUrlDataContainerComponent = withRouter(ProfileContainer);

let withAuthProfileContainer = withAuthRedirect(withUrlDataContainerComponent)

export default ProfileContainer = connect(mapStateToProps, {getProfile})(withAuthProfileContainer);
