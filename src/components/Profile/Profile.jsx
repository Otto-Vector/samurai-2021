import React from 'react';
import styles from './Profile.module.css';
// import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <div className={styles.wrapper}>
            <ProfileInfo/>
            {/*<MyPosts {...props}/>*/}
            <MyPostsContainer {...props}/>
        </div>
    )
}

export default Profile;
