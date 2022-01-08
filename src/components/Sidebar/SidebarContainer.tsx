import Navbar from './Navbar/Navbar'
import FriendsBar from './FriendBar/FriendsBar'
import { useDispatch, useSelector } from 'react-redux'
import { getResponseFriends } from '../../redux/friends-reducer'
import { getFriendsHeader, getFriendsIsFetching, getAnyFriendsReselect } from '../../reselect/friends-selectors'

import classes from './sidebar.module.css'

export const SidebarContainer: React.FC = () => {

    const dispatch = useDispatch()
    const friends = useSelector( getAnyFriendsReselect )
    const header = useSelector( getFriendsHeader )
    const isFetching = useSelector( getFriendsIsFetching )

    const getFriendsList = () => {
        dispatch( getResponseFriends )
    }

    return <div className={ classes.sidebar }>
        <Navbar/>
        <div className={ classes.delimiter }> </div>
        <FriendsBar friends={ friends }
                    header={ header }
                    isFetching={ isFetching }
                    getFriendsList={ getFriendsList }
        />
    </div>
}

