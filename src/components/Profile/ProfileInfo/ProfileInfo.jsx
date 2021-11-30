import React, {useState} from 'react';
import styles from './ProfileInfo.module.css';
import userNoImage from '../../../assets/images/userNoImage.png'
import Preloader from "../../common/Preloader/Preloader";
import ProfileForm from "./ProfileForm/ProfileForm";
import ProfileData from "./ProfileData";


const ProfileInfo = React.memo((props) => {

  let [editMode, setEditMode] = useState(false)

  let onSubmit = async (formData) => {

    await props.setProfileData(formData)
    console.log(props.errorsFromApi)
    //если ошибок не прилетело возвращает нормальное отображение
    // if (!props.errorsFromApi) setEditMode(false)

    //возвращает ошибку в форму из стейта
    return props.errorsFromApi
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
                         initialValues={props.profile}
                         onCancel={()=>{setEditMode(false)}}
          />
          : <ProfileData activateEditMode={() => {setEditMode(true) }}
                         profile={props.profile}
                         isAuthProfile={props.isAuthProfile}
          />
        }
      </div>
    </div>
  )
}
)
export default ProfileInfo;
