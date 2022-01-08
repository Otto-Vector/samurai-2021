import React from 'react'
import styles from './Header.module.css'
import logoSamurai from '../../assets/images/LogoSamurai_sm.png'
import { NavLink } from 'react-router-dom'
import { loginOut } from '../../redux/auth-reducer'
import { getAuthorizedUserData, getIsAuthUser } from '../../reselect/auth-reselectors'
import { useDispatch, useSelector } from 'react-redux'


export const Header: React.FC = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector( getIsAuthUser )
    const { id, login } = useSelector( getAuthorizedUserData )

    const logout = () => {
        dispatch( loginOut() )
    }

    return <header className={ styles.header }>
        <img alt='logo' src={ logoSamurai }/>
        { isAuth
            ? <div className={ styles.login }>
                <NavLink to={ '/profile/' + id }>{ login }</NavLink>
                <div>
                    <button className={ styles.logoutButton }
                            onClick={ logout }
                    >{ 'Logout' }</button>
                </div>
            </div>
            : <NavLink to={ '/login' }
                       className={ styles.loginButton }
            >{ 'login' }</NavLink>
        }
    </header>
}
