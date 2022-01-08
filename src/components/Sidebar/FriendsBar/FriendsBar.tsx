import React from 'react'
import styles from './friendsBar.module.css'
import FriendItem from './FriendItem/FriendItem'
import Preloader from '../../common/Preloader/Preloader'
import withAuthNotShown from '../../hoc/withAuthNotShown'
import { UsersFromSearchType } from '../../../redux/types/types'

type OwnProps = {
    friends: UsersFromSearchType[]
    header: string
    isFetching: boolean

    getFriendsList: () => void
}

const FriendsBar: React.FC<OwnProps> = (
    {
        isFetching, friends, header,
        getFriendsList,
    } ) => {

    if (isFetching) return <Preloader/>

    const friendItem = friends.map( ( args ) => <FriendItem key={ args.id } { ...args } /> )

    return <div className={ styles.friendsBar }>
        <div className={ styles.headerWrapper }>
            <header className={ styles.header }>{ header }</header>
            <button className={ styles.refreshButton }
                    onClick={ () => {
                        getFriendsList()
                    }
                    }>Refresh
            </button>
        </div>
        <div className={ styles.friendItems }>
            { friendItem }
        </div>
    </div>
}

// не отображать друзей, если не авторизован
const withAuthFriendsBar: React.FC<OwnProps> = withAuthNotShown( FriendsBar )

export default withAuthFriendsBar
