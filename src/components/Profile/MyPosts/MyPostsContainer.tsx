// import React from 'react';
import {profileActions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {getNewPostTextPlaceholder, getPosts} from "../../../reselect/profile-selectors";
import {AppStateType} from "../../../redux/redux-store";
import {PostType} from "../../../redux/types/types";

type MapStatePropsType = {
  posts: PostType[]
  newPostTextPlaceholder: string | null
}

type MapDispatchType = {
  addPost: (id : number, newPostText: string) => void
}

export type MyPostsContainerOwnedProps = MapStatePropsType & MapDispatchType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    posts: getPosts(state),
    newPostTextPlaceholder: getNewPostTextPlaceholder(state)
  }
}

const {addPost} = profileActions

const MyPostsContainer = connect<MapStatePropsType, MapDispatchType, {}, AppStateType>(mapStateToProps, {
  addPost
  })(MyPosts)

export default MyPostsContainer;
