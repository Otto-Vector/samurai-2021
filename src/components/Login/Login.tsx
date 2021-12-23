import React from 'react';
import styles from './login.module.css'
import {Redirect} from "react-router-dom";
import LoginForm from "./LoginForm";
import { LoginContainerType } from './LoginContainer';


const Login: React.FC<LoginContainerType> = (
  {isAuth, authURL, loginIn, captchaUrl}) => {

  //не даёт выйти на авторизацию, если уже авторизован и редиректит на профиль
  if (isAuth) return <Redirect to={'profile'} />

  return <div className={ styles.login }>
    <a href={ authURL } target="_blank" rel="noopener noreferrer"
       title={'API сервер для авторизации и доков'}>
      <h1 className={ styles.header }>LOGIN here</h1>
    </a>
    <LoginForm onSubmit={ loginIn }
               captchaUrl={ captchaUrl }
    />
  </div>
}

export default Login
