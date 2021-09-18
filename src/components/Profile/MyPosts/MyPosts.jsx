import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {
  let newPostText = props.newPostText;
  let newPostTextPlaceholder = props.newPostTextPlaceholder

  let addPost = () => {
    props.addPost()
  }

  let onPostChange = (e) => {
    let text = e.target.value
    props.onPostChange(text)
  }

  let postsElements = props.posts.map(args => <Post {...args} key={Math.random().toString()}/>)

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div className={classes.addPostBlock}>
          <textarea className={classes.textarea}
                    onChange={onPostChange}
                    value={newPostText}
                    placeholder={newPostTextPlaceholder}
          />

          <button className={classes.buttonAddPost}
                  onClick={addPost}>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts;
