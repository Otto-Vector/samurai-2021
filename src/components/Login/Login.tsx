import React from 'react';
import styles from './login.module.css'
import {Redirect} from "react-router-dom";
import LoginForm from "./LoginForm";
import { LoginContainerType } from './LoginContainer';
import {AuthDataType} from "../../redux/types/types";


const Login = (props: LoginContainerType) => {

  let onSubmit = async (formData: AuthDataType) => {
    const errorMessages = await props.loginIn(formData)
    //возвращает ошибку в форму из стейта
    return errorMessages || null
  }

  if (props.isAuth) return <Redirect to={'profile'} />

  return <div className={styles.login}>
    <a href={props.authURL} target="_blank" rel="noopener noreferrer"
       title={'API сервер для авторизации и доков'}>
      <h1 className={styles.header}>LOGIN here</h1>
    </a>
    <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
  </div>
}

export default Login
