import {follow, usersActions} from './users-reducer'
import {usersApi} from '../api/users-api'
import {ResponseApiType, ResultCodesEnum} from '../api/samurai-api'

jest.mock( '../api/users-api' )
const usersApiMock = usersApi as jest.Mocked<typeof usersApi>

const result: ResponseApiType = {
    resultCode: ResultCodesEnum.Success,
    messages: [ 'sdfdf' ],
    data: {}
}


test( 'thunk unfollow success', async () => {

        usersApiMock.unfollow.mockReturnValue( Promise.resolve( result ) )

        const thunk = follow( 1, false )
        const dispatchMock = jest.fn()
        const getStateMock = jest.fn()

        await thunk( dispatchMock, getStateMock, {} )

        expect( dispatchMock ).toBeCalledTimes( 3 )
        expect( dispatchMock ).toHaveBeenNthCalledWith( 1, usersActions.isFetchingFollowed( true, 1 ) )
        expect( dispatchMock ).toHaveBeenNthCalledWith( 2, usersActions.followSuccessToggle( 1, false ) )
        expect( dispatchMock ).toHaveBeenNthCalledWith( 3, usersActions.isFetchingFollowed( false, 1 ) )

    }
)


test( 'thunk follow success', async () => {

        usersApiMock.follow.mockReturnValue( Promise.resolve( result ) )

        const thunk = follow( 1, true )
        const dispatchMock = jest.fn()
        const getStateMock = jest.fn()

        await thunk( dispatchMock, getStateMock, {} )

        expect( dispatchMock ).toBeCalledTimes( 3 )
        expect( dispatchMock ).toHaveBeenNthCalledWith( 1, usersActions.isFetchingFollowed( true, 1 ) )
        expect( dispatchMock ).toHaveBeenNthCalledWith( 2, usersActions.followSuccessToggle( 1, true ) )
        expect( dispatchMock ).toHaveBeenNthCalledWith( 3, usersActions.isFetchingFollowed( false, 1 ) )

    }
)
