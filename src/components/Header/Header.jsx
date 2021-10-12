import React from 'react';
import styles from './Header.module.css';
import logoSamurai from '../../assets/images/LogoSamurai_sm.png'
import {NavLink} from "react-router-dom";

const Header = (props) => {

    return <header className={styles.header}>
        <img alt='logo' src={logoSamurai} />
        <NavLink to={"/profile/"+props.id} className={styles.login}>
                {props.login || 'no auth'}
        </NavLink>

    </header>
}

export default Header;
