// import React from 'react';
import {addPost} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {getNewPostTextPlaceholder, getPosts} from "../../../reselect/profile-selectors";

let mapStateToProps = state => {
  return {
    posts: getPosts(state),
    newPostTextPlaceholder : getNewPostTextPlaceholder(state)
  }
}

const MyPostsContainer = connect(mapStateToProps, {
  addPost
  })(MyPosts)

export default MyPostsContainer;
