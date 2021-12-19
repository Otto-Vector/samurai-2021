import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostForm from "./AddPostForm";
import {MyPostsContainerOwnedProps} from "./MyPostsContainer";

export type newPostTextType = {newPostText: string }

const MyPosts: React.FC<MyPostsContainerOwnedProps> = React.memo(({posts, newPostTextPlaceholder, addPost}) => {

  const postsElements = posts.map((args) => <Post {...args} key={args.id}/>)

  let onSubmit = ({newPostText}: newPostTextType) => {
    addPost(33, newPostText)
  }

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
        <AddPostForm onSubmit={onSubmit} newPostTextPlaceholder={newPostTextPlaceholder}/>
      <div className={styles.posts}>
        {postsElements}
      </div>
    </div>
  )
})

export default MyPosts;
