import React from 'react';
import styles from './Header.module.css';
import logoSamurai from '../../assets/images/LogoSamurai_sm.png'

const Header = (props) => {
    console.log(props)
    return <header className={styles.header}>
        <img alt='logo' src={logoSamurai} />
        <span className={styles.login}>{props.login || 'no auth'}</span>
    </header>
}

export default Header;
