import React from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import Socials from "../../common/Socials/Socials";
import userNoImage from '../../../assets/images/userNoImage.png'

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <div className={styles.profilePage}><Preloader/></div>
  }
    return (
        <div className={styles.profilePage}>
            <div className={styles.profileInfo}>
              <div className={styles.left}>
                <img className={styles.imageWrapper} src={props.profile.photos.large || userNoImage} alt='ProfileIMG'/>
              </div>
              <div>
                <h2 className={styles.fullName}>{props.profile.fullName}</h2>
                <p className={styles.aboutMe}>{props.profile.aboutMe}</p>
                <div className={styles.socials}>
                  <Socials {...props.profile.contacts} />
                </div>
                <div className={styles.jobAlert}>
                  <p><strong>Поиск работы:</strong></p>
                  <p>{props.profile.lookingForAJob?'ДА, ищу':'НЕТ, не ищу'}</p>
                  <p>{props.profile.lookingForAJobDescription}</p>
                </div>
              </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
