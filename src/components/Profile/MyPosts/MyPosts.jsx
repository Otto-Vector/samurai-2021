import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

  let newPostElement = React.createRef();

  let addPost = () => {
    // props.functions.addPost()
    props.dispatch({ type: 'ADD-POST' })
  }

  let onPostChange = () => {
    let text = newPostElement.current.value
    // props.functions.changePostText(text)
    let action = { type: 'CHANGE-POST-TEXT', text };
    props.dispatch(action)
  }

  let postsElements = props.posts.map(args => <Post {...args} key={Math.random().toString()}/>)

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div className={classes.addPostBlock}>
          <textarea className={classes.textarea}
                    ref={newPostElement}
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
