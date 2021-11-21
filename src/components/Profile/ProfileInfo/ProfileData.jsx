import React from 'react';
import styles from './ProfileInfo.module.css';
import Socials from "../../common/Socials/Socials";
import ProfileStatusContainer from "./ProfileStatus/ProfileStatusContainer";


const ProfileData = React.memo(({isAuthProfile,activateEditMode,profile}) => {
// const ProfileData = ({isAuthProfile,activateEditMode,profile}) => {

  return <div>
    <h2 className={styles.fullName}>{profile.fullName}</h2>
    <ProfileStatusContainer/>
    <p className={styles.aboutMe}>{profile.aboutMe}</p>
    <div className={styles.socials}>
      <Socials contacts={profile.contacts}/>
    </div>
    <div className={styles.jobAlert}>
      <p><strong>Поиск работы:</strong></p>
      {!profile.lookingForAJob ? <p>НЕТ, не ищу</p> :
        <div>
          <p>ДА, ищу</p>
          <strong><p>Skills:</p></strong>
          <p>{profile.lookingForAJobDescription}</p>
        </div>
      }
    </div>
    <div className={styles.editButtonWrapper}>
      {isAuthProfile && <button className={styles.editButton} onClick={activateEditMode}>Edit</button>}
    </div>
  </div>
}
)

export default ProfileData;
