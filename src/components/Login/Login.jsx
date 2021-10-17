import React from 'react';
import styles from './login.module.css'

const Login = (props) => {
  return <div className={styles.login}>
    <a href={props.authURL} target='_blank' rel="noopener noreferrer" title={props.authURL}><h1>LOGIN here</h1></a>
  </div>
}

export default Login
