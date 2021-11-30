import React from 'react';
import styles from './Header.module.css';
import logoSamurai from '../../assets/images/LogoSamurai_sm.png'
import {NavLink} from "react-router-dom";
import {HeaderContainerType} from "./HeaderContainer";


const Header: React.FC<HeaderContainerType> =  ({isAuth, data: {id, login}, loginOut})=> {

  return <header className={styles.header}>
    <img alt='logo' src={logoSamurai}/>
    {
      isAuth ?
        (<span className={styles.login}>
          <NavLink to={"/profile/" + id}>{login}</NavLink>
          <div>
          <button className={styles.logoutButton} onClick={loginOut}>Logout</button>
            </div>
        </span>)
        :
        <NavLink activeClassName={styles.loginButton} to={"/login"} className={styles.login}>{'login'}</NavLink>
    }
  </header>
}

export default Header;
