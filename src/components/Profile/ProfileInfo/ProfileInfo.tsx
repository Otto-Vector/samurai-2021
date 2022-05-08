import React, {ChangeEvent, useState} from 'react'
import styles from './ProfileInfo.module.css'
import userNoImage from '../../../assets/images/userNoImage.png'
import Preloader from '../../common/Preloader/Preloader'
import {ProfileForm} from './ProfileForm/ProfileForm'
import ProfileData from './ProfileData'
import {followProfile, setPhoto} from '../../../redux/profile-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getProfileIsFollowCurrent,
    getProfileIsAuth,
    getProfileIsFollowFetching,
    getProfileData,
    getProfileIsFetching,
} from '../../../reselect/profile-selectors'
import Upload, {UploadProps} from 'rc-upload';


const ProfileInfoPage: React.FC = () => {

    const dispatch = useDispatch()
    const profile = useSelector(getProfileData)
    const isFetching = useSelector(getProfileIsFetching)
    const isFollowCurrent = useSelector(getProfileIsFollowCurrent)
    const isAuthProfile = useSelector(getProfileIsAuth)
    const isFollowFetching = useSelector(getProfileIsFollowFetching)

    const [editMode, setEditMode] = useState(false)

    const uploadProps: UploadProps = {
        accept: '.png, .jpeg, .pdf, .jpg',
        multiple: false,
        onError: (err, responce, file) => {
            alert('Не удалось загрузить, попрбуйте другой файл');
        },
        beforeUpload: (file) => {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'application/pdf') {
                alert('Файл не является изображением! /n' + file.type);
                return false;
            }
            return dispatch(setPhoto(file)) as unknown as Promise<void>
        },
    };

    // const beforeUpload = ( file: File ) => {
    // // const sendFile = ( event: ChangeEvent<HTMLInputElement> ) => {
    //     // if (event.target.files?.length) dispatch( setPhoto( event.target.files[0] ) )
    //     debugger;
    //     if (file) dispatch( setPhoto( file ) )
    // }
    if (!profile) {
        return <div>Profile hereUp</div>
    }
    if (isFetching) {
        return <div className={styles.profilePage}><Preloader/></div>
    } else

        return (
            <div className={styles.profilePage}>
                <div className={styles.profileInfo}>
                    <div className={styles.left}>
                        <img className={styles.imageWrapper} src={profile.photos.large || userNoImage}
                             alt="ProfileImage"/>
                        <div className={styles.underImage}>
                            {isAuthProfile ?
                                <Upload {...uploadProps}>
                                    <button>Поменять аватарку</button>
                                </Upload>
                                :
                                <button type={'button'}
                                        className={`${styles.followButton} ${isFollowCurrent && styles.unfollow}`}
                                        onClick={() => {
                                            dispatch(followProfile(isFollowCurrent, profile.userId as number))
                                        }}
                                        disabled={isFollowFetching}
                                >{isFollowCurrent ? 'unfollow' : 'follow'}</button>
                            }
                        </div>
                    </div>
                    {editMode
                        ? <ProfileForm initialValues={profile}
                                       onCancel={() => {
                                           setEditMode(false)
                                       }}
                        />
                        : <ProfileData activateEditMode={() => {
                            setEditMode(true)
                        }}
                                       profile={profile}
                                       isAuthProfile={isAuthProfile}
                        />
                    }
                </div>
            </div>
        )
}

export const ProfileInfo = React.memo(ProfileInfoPage)
