import React, {ChangeEvent, useState} from 'react';
import styles from './ProfileInfo.module.css';
import userNoImage from '../../../assets/images/userNoImage.png'
import Preloader from "../../common/Preloader/Preloader";
import ProfileForm from "./ProfileForm/ProfileForm";
import ProfileData from "./ProfileData";
import {ProfileType} from "../../../redux/types/types";
import {ProfileThunkActionType} from "../../../redux/profile-reducer";

type OwnPropsType = {
  profile: ProfileType | null
  isAuthProfile: boolean
  isFetching: boolean
  setPhoto: (userPhoto: File) => void
  setProfileData: (data: ProfileType) => ProfileThunkActionType<string[] | null> | Promise<string[] | null>
}


const ProfileInfo = React.memo(
  ({profile, isAuthProfile, isFetching, setPhoto, setProfileData}: OwnPropsType) => {

  let [editMode, setEditMode] = useState(false)


  const sendFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setPhoto(e.target.files[0])
  }

  if (isFetching) {
    return <div className={styles.profilePage}><Preloader/></div>
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileInfo}>
        <div className={styles.left}>
          <img className={styles.imageWrapper} src={profile?.photos.large || userNoImage} alt='ProfileImage'/>
          {isAuthProfile && <input type={'file'} onChange={sendFile}/>}
        </div>
        {editMode
          ? <ProfileForm onSubmit={setProfileData}
                         initialValues={profile}
                         onCancel={()=>{setEditMode(false)}}
          />
          : <ProfileData activateEditMode={() => {setEditMode(true) }}
                         profile={profile}
                         isAuthProfile={isAuthProfile}
          />
        }
      </div>
    </div>
  )
}
)
export default ProfileInfo;
