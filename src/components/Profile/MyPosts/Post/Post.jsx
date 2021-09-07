import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {

  return (
    <div className={styles.item}>
      <img src={props.imageURL} alt='postImage' />
        { props.message }
          <div>
        <span>like</span> { props.likesCount }
      </div>
    </div>
  )
}

export default Post;
