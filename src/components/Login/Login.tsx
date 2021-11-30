import React from 'react';
import styles from './login.module.css'
import {Redirect} from "react-router-dom";
import LoginForm from "./LoginForm";
import { LoginContainerType } from './LoginContainer';
import { LoginDataType} from "../../redux/types/types";


const Login = (props: LoginContainerType) => {

  let onSubmit = async (formData: LoginDataType) => {
    // let error = await props.loginIn(formData)
    // console.log(props.errorsFromApi)
    // возвращает ошибку в форму из стейта
    return await props.loginIn(formData)
  }

  if (props.isAuth) return <Redirect to={'profile'} />

  return <div className={styles.login}>
    <a href={props.authURL} target="_blank" rel="noopener noreferrer"
       title={'API сервер для авторизации и доков'}>
      <h1 className={styles.header}>LOGIN here</h1>
    </a>
    < LoginForm
                onSubmit={ props.loginIn }
                captchaUrl={ props.captchaUrl }
    />

  </div>
}

export default Login
