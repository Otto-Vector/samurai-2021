// import React from 'react';
import {addPost, changePost} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
    newPostTextPlaceholder : state.profilePage.newPostTextPlaceholder
  }
}


const MyPostsContainer = connect(mapStateToProps, {
  changePost, addPost
  })(MyPosts)

export default MyPostsContainer;
