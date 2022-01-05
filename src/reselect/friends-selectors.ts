import { randomDifferentIntegersArrayCreator } from '../utils/utils'
import { createSelector } from 'reselect'
import { AppStateType } from '../redux/redux-store'
import { FriendsReducerStateType } from '../redux/friends-reducer'

type FriendsReselector<T extends keyof Y, Y = FriendsReducerStateType> = ( state: AppStateType ) => Y[T]

export const getFriendsHeader: FriendsReselector<'header'> = ( state ) => state.sidebar.header
export const getFriendsIsFetching: FriendsReselector<'isFetching'> = ( state ) => state.sidebar.isFetching

const getFriends: FriendsReselector<'friends'> = ( state ) => state.sidebar.friends
const getFriendsToShow: FriendsReselector<'friendsToShow'> = ( state ) => state.sidebar.friendsToShow

export const getAnyFriendsReselect = createSelector( getFriends, getFriendsToShow, ( friends, friendsToShow ) => {
    const maxFriends = friends.length
    const toShow = Math.min( maxFriends, friendsToShow )

    return randomDifferentIntegersArrayCreator( maxFriends )( toShow ).map( index => friends[index] )
} )
