import React from 'react'
import styles from './friendItem.module.css'
import { NavLink } from 'react-router-dom'
import noImage from '../../../../assets/images/userNoImage.png'
import { UsersFromSearchType } from '../../../../redux/types/types'


const FriendItem: React.FC<UsersFromSearchType> = ( {id, name, photos } ) => {

    const path = '/profile/' + id

    return <div className={ styles.friendItem }>
        <NavLink to={ path }>
            <img
                className={ styles.image }
                alt={ 'friendImg' }
                title={ name }
                src={ photos.small || noImage }
            />
        </NavLink>
    </div>

}

export default FriendItem
