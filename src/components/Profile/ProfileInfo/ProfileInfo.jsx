import React from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import Socials from "../../common/Socials/Socials";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }
    return (
        <div className={styles.profilePage}>
            <div className={styles.profileInfo}>
              <div className={styles.left}>
                <img className={styles.imageWrapper} src={props.profile.photos.large} alt='ProfileIMG'/>
              </div>
              <div>
                <h2 className={styles.fullName}>{props.profile.fullName}</h2>
                <p className={styles.aboutMe}>{props.profile.aboutMe}</p>
                <Socials {...props.profile.contacts} />
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
