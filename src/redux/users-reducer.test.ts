import { usersActions, UsersReducerStateType } from './users-reducer'
import usersReducer from './users-reducer'

let state: UsersReducerStateType

beforeEach( () => {
    state = {
        users: [
            {
                id: 0, name: 'Otto 0', followed: false,
                photos: { small: null, large: null },
                status: 'status 0',
            },
            {
                id: 1, name: 'Otto 1', followed: false,
                photos: { small: null, large: null },
                status: 'status 1',
            },
            {
                id: 2, name: 'Otto 2', followed: true,
                photos: { small: null, large: null },
                status: 'status 2',
            },
            {
                id: 3, name: 'Otto 3', followed: true,
                photos: { small: null, large: null },
                status: 'status 3',
            },
        ],
        totalUsersCount: 0,
        usersFilter: {
            pageSize: 5,
            currentPage: 1,
            isFriends: null,
            userName: '',
        },
        isFetching: true,
        isFetchingById: [],
    }
} )

test( 'follow success', () => {

    const newState = usersReducer( state, usersActions.followSuccessToggle( 1, true ) )

    expect( newState.users[0].followed ).toBeFalsy()
    expect( newState.users[1].followed ).toBeTruthy()

} )


test( 'unfollow success', () => {

    const newState = usersReducer( state, usersActions.followSuccessToggle( 3, false ) )

    expect( newState.users[2].followed ).toBeTruthy()
    expect( newState.users[3].followed ).toBeFalsy()

} )
