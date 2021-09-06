import React from 'react';
// import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    // console.log(props)
    let posts = props.prop
    return (
        <div>
            <ProfileInfo/>
            <MyPosts prop={posts}/>
        </div>
    )
}

export default Profile;
