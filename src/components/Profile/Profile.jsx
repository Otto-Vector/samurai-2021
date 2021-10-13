import React from 'react';
import styles from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <div className={styles.wrapper}>
            {/*<ProfileInfo profile = {props.profile} isFetching = {props.isFetching}/>*/}
            <ProfileInfo {...props} />
            <MyPostsContainer />
        </div>
    )
}

export default Profile;
