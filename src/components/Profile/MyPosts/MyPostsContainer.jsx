// import React from 'react';
import {addPostActionCreator, changePostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

// const MyPostsContainer = (props) => {
//   let state = props.state.getState().profilePage
//
//   let addPost = () => {
//     let action = addPostActionCreator()
//     props.state.dispatch(action)
//   }
//
//   let onPostChange = (text) => {
//     let action = changePostActionCreator(text);
//     props.state.dispatch(action)
//   }
//
//
//   return <MyPosts
//     posts = {state.posts}
//     newPostText = {state.newPostText}
//     newPostTextPlaceholder = {state.newPostTextPlaceholder}
//     onPostChange = {onPostChange}
//     addPost = {addPost}
//   />
// }

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
    newPostTextPlaceholder : state.profilePage.newPostTextPlaceholder
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onPostChange : (text) => {
      dispatch(changePostActionCreator(text))
    },
    addPost: () => {
      dispatch(addPostActionCreator())
    }
  }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
