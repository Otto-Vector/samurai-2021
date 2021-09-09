import React from 'react';
import styles from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = (props) => {
    return (
        <nav className={styles.nav}>
            <div className={styles.item}>
                <NavLink to="/profile" activeClassName={styles.activeLink}>Profile</NavLink>
            </div>
            <div className={`${styles.item} ${styles.active}`}>
                <NavLink to="/dialogs" activeClassName={styles.activeLink}>Messages</NavLink>
            </div>
            {/*<div className={styles.item}>*/}
            {/*    <a href={'#'}>News</a>*/}
            {/*</div>*/}
            {/*<div className={styles.item}>*/}
            {/*    <a href={'#'}>Music</a>*/}
            {/*</div>*/}
            {/*<div className={styles.item}>*/}
            {/*    <a href={'#'}>Settings</a>*/}
            {/*</div>*/}
            <div className={styles.friends}>
                <Sidebar {...props}/>
            </div>
        </nav>
    )
}

export default Navbar;
