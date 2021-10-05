import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = (props) => {

  let postsElements = props.posts.map(args => <Post {...args} key={Math.random().toString()}/>)

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div className={classes.addPostBlock}>
          <textarea className={classes.textarea}
                    onChange={e => {
                      props.changePost(e.target.value)
                    }}
                    value={props.newPostText}
                    placeholder={props.newPostTextPlaceholder}
          />

          <button className={classes.buttonAddPost}
                  onClick={props.addPost}>Add post
          </button>
        </div>
      </div>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts;
