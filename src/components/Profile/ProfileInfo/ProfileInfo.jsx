import React, {useState} from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import Socials from "../../common/Socials/Socials";
import ProfileStatusContainer from "./ProfileStatus/ProfileStatusContainer";
import userNoImage from '../../../assets/images/userNoImage.png'
import ProfileForm from "./ProfileForm/ProfileForm";


const ProfileData = ({isAuthProfile,activateEditMode,profile}) => {

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



const ProfileInfo = (props) => {

  let [editMode, setEditMode] = useState(false)

  let onSubmit = async formData => {
    let userId = props.profile.userId
    let send = {...formData, userId}
    console.log(send)
    await props.setProfileData({...formData, userId})
    //если ошибок не прилетело возвращает нормальное отображение
    if (!props.errorMessage) setEditMode(false)
    //возвращает ошибку в форму из стейта
    return props.errorMessage || null
  }

  const sendFile = e => {
    if (e.target.files.length) props.setPhoto(e.target.files[0])
  }

  if (props.isFetching) {
    return <div className={styles.profilePage}><Preloader/></div>
  }
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileInfo}>
        <div className={styles.left}>
          <img className={styles.imageWrapper} src={props.profile.photos.large || userNoImage} alt='ProfileIMG'/>
          {props.isAuthProfile && <input type={'file'} onChange={sendFile}/>}
        </div>
        {editMode
          ? <ProfileForm onSubmit={onSubmit}
                         profile={props.profile}/>
          : <ProfileData activateEditMode={() => {setEditMode(true) }}
                         profile={props.profile}
                         isAuthProfile={props.isAuthProfile}
          />
        }
      </div>
    </div>
  )
}

export default ProfileInfo;
