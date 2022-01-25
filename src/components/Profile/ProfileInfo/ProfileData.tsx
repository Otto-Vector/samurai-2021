import React from 'react'
import styles from './ProfileInfo.module.css'
import Socials from '../../common/Socials/Socials'
import ProfileStatusContainer from './ProfileStatus/ProfileStatusContainer'
import { ProfileType } from '../../../redux/types/types'

type OwnPropsType = {
    profile: ProfileType | null
    isAuthProfile: boolean
    activateEditMode: () => void
}

const ProfileData: React.FC<OwnPropsType> = (
    { isAuthProfile, activateEditMode, profile } ) => {

    return <div>
        <h2 className={ styles.fullName }>{ profile?.fullName }</h2>
        <ProfileStatusContainer/>
        <p className={ styles.aboutMe }>{ profile?.aboutMe }</p>
        <div className={ styles.socials }>
            <Socials contacts={ profile?.contacts }/>
        </div>
        <div className={ styles.jobAlert }>
            <p><strong>Поиск работы:</strong></p>
            { !profile?.lookingForAJob ? <p>НЕТ, не ищу</p> :
                <div>
                    <p>ДА, ищу</p>
                    <strong><p>Skills:</p></strong>
                    <p>{ profile?.lookingForAJobDescription }</p>
                </div>
            }
        </div>
        <div className={ styles.editButtonWrapper }>
            { isAuthProfile && <button className={ styles.editButton } onClick={ activateEditMode }>Edit</button> }
        </div>
    </div>
}

const memoizedProfileData = React.memo( ProfileData )

export default memoizedProfileData
