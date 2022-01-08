import React from 'react'
import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'


export const Navbar: React.FC = () => {
    return (
        <nav className={ styles.nav }>
            <div className={ styles.item }>
                <NavLink to="/profile" activeClassName={ styles.activeLink }>Profile</NavLink>
            </div>
            <div className={ styles.item }>
                <NavLink to="/dialogs" activeClassName={ styles.activeLink }>Messages</NavLink>
            </div>
            <div className={ styles.item }>
                <NavLink to="/users" activeClassName={ styles.activeLink }>Users</NavLink>
            </div>
            <div className={ styles.item }>
                <NavLink to="/login" activeClassName={ styles.activeLink }>Login</NavLink>
            </div>
        </nav>
    )
}
