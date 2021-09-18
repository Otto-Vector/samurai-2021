import React from 'react';
import {addPostActionCreator, changePostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {
  let state = props.state.getState().profilePage

  let addPost = () => {
    let action = addPostActionCreator()
    props.state.dispatch(action)
  }

  let onPostChange = (text) => {
    let action = changePostActionCreator(text);
    props.state.dispatch(action)
  }


  return <MyPosts
    posts = {state.posts}
    newPostText = {state.newPostText}
    newPostTextPlaceholder = {state.newPostTextPlaceholder}
    onPostChange = {onPostChange}
    addPost = {addPost}
  />
}

export default MyPostsContainer;
