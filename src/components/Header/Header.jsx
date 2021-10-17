import React from 'react';
import styles from './Header.module.css';
import logoSamurai from '../../assets/images/LogoSamurai_sm.png'
import {NavLink} from "react-router-dom";

const Header = (props) => {
  return <header className={styles.header}>
    <img alt='logo' src={logoSamurai}/>
    {
      props.isAuth ?
        <NavLink to={"/profile/" + props.id} className={styles.login}>{props.login}</NavLink>
        :
        <NavLink to={"/login"} className={styles.login}>{'/login'}</NavLink>
    }
  </header>
}

export default Header;
