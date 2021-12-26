import {follow} from './users-reducer'
import {usersApi} from '../api/users-api'
import {ResponseApiType, ResultCodesEnum} from '../api/samurai-api'

jest.mock('../api/users-api')
const usersApiMock = usersApi

const result: ResponseApiType = {
    resultCode: ResultCodesEnum.Success,
    messages: ["sdfdf"],
    data: {}
}


test('API thunk follow', async ()=> {

    // @ts-ignore
    usersApiMock.follow.mockReturnValue(Promise.resolve(result))

    const thunk = follow(1, true)
    const dispatchMock = jest.fn()

    // @ts-ignore
    await thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(3)

    }
)
