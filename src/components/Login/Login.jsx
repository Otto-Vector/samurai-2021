import React from 'react';
import styles from './login.module.css'
import {Field, Form} from "react-final-form";
import {composeValidators, required} from "../../utils/validators";
import {TextArea} from "../common/TextArea/TextArea";

const LoginForm = (props) => {
  return (
  <Form
    onSubmit={props.onSubmit}
    initialValues={{
      loginName: '',
      password: '',
      rememberMe: true,
    }}
    render={
      ({handleSubmit, pristine, form, submitting, values}) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field name={'loginName'}
                   component={'input'}
                   placeholder={'Login'}
                   component={TextArea}
                   validate={composeValidators(required)}
            />
          </div>
          <div>
            <Field name={'password'} component={'input'} placeholder={'Password'}/>
          </div>
          <div>
            <label>
              <Field name={'remeberMe'} component={"checkbox"} />
              Remember me
            </label>
          </div>
          <button type={'submit'}>Done</button>
          <button type={'button'}
                      className={styles.resetButton}
                      disabled={pristine || submitting}
                      onClick={form.reset}>X
              </button>
        </form>
      )
    }/>
  )
}


const Login = (props) => {
  let onSubmit = (formData) => {
    console.log(formData)
  }
  return <div className={styles.login}>
    <a href={props.authURL} target='_blank' rel="noopener noreferrer" title={props.authURL}><h1>LOGIN here</h1></a>
    <LoginForm onSubmit={onSubmit}/>
  </div>
}

export default Login
