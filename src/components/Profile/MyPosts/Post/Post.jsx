import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {

  return (
    <div className={styles.item}>
      <img src={props.imageURL} alt='postImage' />
      <div className={styles.message}>
        { props.message }
      </div>
      <div className={styles.likes}>
        {/*eslint-disable-next-line*/}
        <span role="img">&#128156;</span>
        { props.likesCount }
      </div>
    </div>
  )
}

export default Post;
