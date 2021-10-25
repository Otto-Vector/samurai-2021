import React from 'react';
import styles from './login.module.css'
import {Field, Form} from "react-final-form";
import {composeValidators, required} from "../../utils/validators";
import {Input} from "../common/FormType/FormType";

const LoginForm = (props) => {
  return (
  <Form
    onSubmit={props.onSubmit}
    initialValues={{
      email: '',
      password: '',
      rememberMe: true,
    }}
    render={
      ({handleSubmit, pristine, form, submitting, values}) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.input}>
            <Field name={'email'}
                   placeholder={'Email'}
                   component={Input}
                   type={'email'}
                   validate={composeValidators(required)}
            />
          </div>
          <div className={styles.input}>
            <Field name={'password'}
                   component={Input}
                   type={'password'}
                   placeholder={'Password'}
                   validate={composeValidators(required)}
            />
          </div>
          <div>
            <label className={styles.checkbox}>
              <Field name={'rememberMe'}
                     component={'input'}
                     type={'checkbox'}
              />
              Remember me
            </label>
          </div>
          <button className={styles.button} type={'submit'}>Done</button>
          <button type={'button'}
                      className={styles.button}
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
