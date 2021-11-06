import React from 'react';
import styles from './login.module.css'

import {Input} from "../common/FormType/FormType";
import {Field, Form} from "react-final-form";
import {composeValidators, required} from "../../utils/validators";
import {FORM_ERROR} from "final-form";

const LoginForm = props => {

  let onSubmit = async formData => {
    let error = await props.onSubmit(formData)
    return {
      [FORM_ERROR]: error || null
    }
  }

  return (
  <Form
    onSubmit={onSubmit}
    initialValues={{
      email: '',
      password: '',
      rememberMe: true,
    }}
    render={
      ({ submitError, handleSubmit, pristine, form, submitting, values}) => (
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
          {submitError && <span className={styles.onError}>{submitError}</span>}
        </form>
      )
    }/>
  )
}

export default LoginForm
