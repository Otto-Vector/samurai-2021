import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/types/types";
import {ProfileThunkActionType} from "../../redux/profile-reducer";

type OwnPropsType = {
  profile: ProfileType | null
  isAuthProfile: boolean
  isFetching: boolean
  isFollowCurrent: boolean
  isFollowFetching: boolean

  setPhoto: (userPhoto: File) => void
  setProfileData: (data: ProfileType) => ProfileThunkActionType<string[] | null> | Promise<string[] | null>
  // setProfileData: (data: ProfileType) => void
  followProfile: (isFollow: boolean, userId: number) => void
}

const Profile: React.FC<OwnPropsType> = (props) => {

    return (
        <div className={styles.wrapper}>
            <ProfileInfo {...props} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;
