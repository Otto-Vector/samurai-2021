import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {addPostActionCreator, changePostActionCreator} from "../../../redux/profile-reducer";


const MyPosts = (props) => {

  let addPost = () => {
    let action = addPostActionCreator()

    props.dispatch(action)
  }

  let onPostChange = (e) => {
    let text = e.target.value
    let action = changePostActionCreator(text);
    props.dispatch(action)
  }

  let postsElements = props.posts.map(args => <Post {...args} key={Math.random().toString()}/>)

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div className={classes.addPostBlock}>
          <textarea className={classes.textarea}
                    onChange={onPostChange}
                    value={props.newPostText}/>

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
