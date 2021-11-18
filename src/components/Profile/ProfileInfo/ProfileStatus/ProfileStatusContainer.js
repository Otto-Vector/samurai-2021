import {connect} from "react-redux";
import ProfileStatusFunc from "./ProfileStatusFunc";
import {getStatus, updateStatus} from "../../../../redux/profile-reducer";

let mapStateToProps = state => {
  return {
    profileStatusText: state.profilePage.profileStatusText,
    profileStatusFetching: state.profilePage.profileStatusFetching,
    profileStatusPlaceholder: state.profilePage.profileStatusPlaceholder,
    isAuthProfile: state.profilePage.isAuthProfile
  }
}

const ProfileStatusContainer = connect(mapStateToProps, {
  getStatus,
  updateStatus
})(ProfileStatusFunc)


export default ProfileStatusContainer
