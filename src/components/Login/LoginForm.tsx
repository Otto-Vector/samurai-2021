import React from 'react';
import styles from './login.module.css'

import {Input} from "../common/FormType/FormType";
import {Field, Form} from "react-final-form";
import {composeValidators, required} from "../../utils/validators";
import {FORM_ERROR} from "final-form";
import { LoginDataType } from '../../redux/types/types';
import {AuthThunkActionType} from "../../redux/auth-reducer";

type OwnProps = {
  captchaUrl: string | null
  onSubmit: (loginData: LoginDataType) => AuthThunkActionType<string[]|null> | Promise<string[]|null>
}

const LoginForm = ({onSubmit, captchaUrl}: OwnProps) => {

  const onSubmit2 = async (formData: LoginDataType) => {
    let error = await onSubmit(formData)

    return { [FORM_ERROR]: error || null }
  }

  return (
  <Form
    onSubmit={onSubmit2}
    initialValues={{ // toDo: Передать initialValues из стейта?
      email: '',
      password: '',
      rememberMe: true,
      captcha: null
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

          {captchaUrl && <div className={styles.forCaptcha}>
            <img alt={'captcha'} title={'captcha'} src={captchaUrl ?? undefined}/>
            <div className={styles.input}>
             <Field name={'captcha'}
                   component={Input}
                   type={'text'}
                   placeholder={'input captcha from image before'}
                   validate={composeValidators(required)}
             />
            </div>
          </div>
          }
          {<button className={styles.button} type={'submit'} disabled={submitting}>Done</button>}
          <button type={'button'}
                      className={styles.button}
                      disabled={pristine || submitting}
                      // onClick={form.reset}
          >X
              </button>
          {submitError && <span className={styles.onError}>{submitError}</span>}
        </form>
      )
    }/>
  )
}

export default LoginForm
