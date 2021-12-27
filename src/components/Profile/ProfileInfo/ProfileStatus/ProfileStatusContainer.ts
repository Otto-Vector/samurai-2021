import { connect } from 'react-redux'
import ProfileStatus from './ProfileStatus'
import { getStatus, updateStatus } from '../../../../redux/profile-reducer'
import { AppStateType } from '../../../../redux/redux-store'

type MapStatePropsType = {
    profileStatusText: string | null
    profileStatusFetching: boolean
    profileStatusPlaceholder?: string
    isAuthProfile: boolean
}

type MapDispatchType = {
    getStatus: ( userId: number ) => void
    updateStatus: ( userStatus: string ) => void
}

type OwnProps = {}

export type ProfileStatusProps = MapStatePropsType & MapDispatchType & OwnProps

const mapStateToProps = ( state: AppStateType ): MapStatePropsType => {
    return {
        profileStatusText: state.profilePage.profileStatusText,
        profileStatusFetching: state.profilePage.profileStatusFetching,
        profileStatusPlaceholder: state.profilePage.profileStatusPlaceholder,
        isAuthProfile: state.profilePage.isAuthProfile,
    }
}

const ProfileStatusContainer = connect<MapStatePropsType, MapDispatchType, OwnProps, AppStateType>( mapStateToProps, {
    getStatus,
    updateStatus,
} )( ProfileStatus )


export default ProfileStatusContainer
