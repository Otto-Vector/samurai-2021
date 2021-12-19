import React from 'react';
import styles from './Post.module.css';
import noImage from "../../../../assets/images/userNoImage.png"
import {PostType} from "../../../../redux/types/types";


const Post: React.FC<PostType> = ({imageURL, message, likesCount}) => {

  return (
    <div className={styles.item}>
      <img src={imageURL || noImage} alt='postImage' />
      {/*<img src={noImage} alt='postImage' />*/}
      <div className={styles.message}>
        { message }
      </div>
      <div className={styles.likes}>
        <span role="img">&#128156;</span>
        { likesCount }
      </div>
    </div>
  )
}

export default Post;
