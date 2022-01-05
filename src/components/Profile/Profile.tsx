import React from 'react'
import styles from './Profile.module.css'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'


export const Profile: React.FC = () => {

    return (
        <div className={ styles.wrapper }>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}
