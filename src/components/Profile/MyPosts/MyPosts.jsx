import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, Form} from "react-final-form";
import {TextArea} from "../../common/FormType/FormType";
import {composeValidators, required} from "../../../utils/validators";


const AddPostForm = (props) => {
  return (
    <Form
       onSubmit={props.onSubmit}
        initialValues={{
          newPostText: ''
        }}
        render=
          {({handleSubmit, pristine, form, submitting, values}) => (
        <form onSubmit={handleSubmit}
              className={styles.addPostBlock}
        >
          <div className={styles.textarea}>
          <Field
                 name={'newPostText'}
                 placeholder={props.newPostTextPlaceholder}
                 validate={composeValidators(required)}
                 component={TextArea}
          />
          </div>

          <button type={'button'}
                      className={styles.resetButton}
                      disabled={pristine || submitting}
                      onClick={form.reset}>X
              </button>
          <button type={'submit'}
                  className={styles.buttonAddPost}
          >Add post</button>
        </form>
      )}
    >
    </Form>
  )
}


const MyPosts = React.memo(props => {


  let postsElements = props.posts.map(args => <Post {...args} key={Math.random().toString()}/>)

  let onSubmit = (formData) => {
    props.addPost(33,formData.newPostText)
  }

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
        <AddPostForm onSubmit={onSubmit} newPostTextPlaceholder={props.newPostTextPlaceholder}/>
      <div className={styles.posts}>
        {postsElements}
      </div>
    </div>
  )
})

export default MyPosts;
