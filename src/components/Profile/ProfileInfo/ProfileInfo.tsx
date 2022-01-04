import React, { ChangeEvent, useState } from 'react'
import styles from './ProfileInfo.module.css'
import userNoImage from '../../../assets/images/userNoImage.png'
import Preloader from '../../common/Preloader/Preloader'
import ProfileForm from './ProfileForm/ProfileForm'
import ProfileData from './ProfileData'
import { ProfileType } from '../../../redux/types/types'
import { ProfileThunkActionType } from '../../../redux/profile-reducer'

type OwnPropsType = {
    profile: ProfileType | null
    isAuthProfile: boolean
    isFetching: boolean
    isFollowCurrent: boolean
    isFollowFetching: boolean

    setPhoto: ( userPhoto: File ) => void
    setProfileData: (data: ProfileType) => ProfileThunkActionType<string[] | null> | Promise<string[] | null>
    // setProfileData: ( data: ProfileType ) => void
    followProfile: ( isFollow: boolean, userId: number ) => void
}


const ProfileInfo: React.FC<OwnPropsType> = (
    {
        profile, isAuthProfile, isFetching, isFollowCurrent, isFollowFetching,
        setPhoto, setProfileData, followProfile,
    } ) => {

    const [ editMode, setEditMode ] = useState( false )

    const sendFile = ( event: ChangeEvent<HTMLInputElement> ) => {
        if (event.target.files?.length) setPhoto( event.target.files[0] )
    }
    if (!profile) {
        return null
    }
    if (isFetching) {
        return <div className={ styles.profilePage }><Preloader/></div>
    }

    return (
        <div className={ styles.profilePage }>
            <div className={ styles.profileInfo }>
                <div className={ styles.left }>
                    <img className={ styles.imageWrapper } src={ profile.photos.large || userNoImage }
                         alt='ProfileImage'/>
                    <div className={ styles.underImage }>
                        { isAuthProfile ? <input type={ 'file' } onChange={ sendFile }/>
                            :
                            <button type={ 'button' }
                                    className={ `${ styles.followButton } ${ isFollowCurrent && styles.unfollow }` }
                                    onClick={ () => {
                                        followProfile( isFollowCurrent, profile.userId as number )
                                    } }
                                    disabled={ isFollowFetching }
                            >{ isFollowCurrent ? 'unfollow' : 'follow' }</button>
                        }
                    </div>
                </div>
                { editMode
                    ? <ProfileForm onSubmit={ setProfileData }
                                   initialValues={ profile }
                                   onCancel={ () => {
                                       setEditMode( false )
                                   } }
                    />
                    : <ProfileData activateEditMode={ () => {
                        setEditMode( true )
                    } }
                                   profile={ profile }
                                   isAuthProfile={ isAuthProfile }
                    />
                }
            </div>
        </div>
    )
}

const memoizedProfileInfo = React.memo( ProfileInfo )

export default memoizedProfileInfo
