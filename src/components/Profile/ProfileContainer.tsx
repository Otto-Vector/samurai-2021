import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { Profile } from './Profile'
import {
    getProfile,
    getStatus,
    profileActions,
} from '../../redux/profile-reducer'
import { getAuthorizedUserDataId } from '../../reselect/auth-reselectors'


const ProfileContainer: React.FC = () => {
    // вытаскиваем значение роутера
    const { userId } = useParams<{ userId: string }>()
    // присваиваем первое значение из роутера
    const [ userID, changeUserID ] = useState( +(userId || 0) )
    // и меняем пользователя внутри компоненты, пока она живёт
    const history = useHistory()
    const dispatch = useDispatch()

    // переменные из селектора
    const authUserId = useSelector( getAuthorizedUserDataId )

    // по умолчанию, всегда берёт активный userID
    const updateProfile = ( idFromRouter = userID ) => {

        const _userId = idFromRouter || +(authUserId || 0)

        dispatch( profileActions.setIsAuthProfile( _userId === +(authUserId || 0) ) )
        dispatch( getProfile( _userId ) )
        dispatch( getStatus( _userId ) )
    }

    useEffect( () => {
        // загружаем данные пользователя в UI
        updateProfile()

        // создаём прослушку истории браузера
        const unlisten = history.listen( ( { pathname } ) => {
            // преображаем id пользователя в число
            const idFromRoute = +pathname.split( '/' ).reverse()[0]
            // изменяем значение id пользователя
            changeUserID( idFromRoute )
        } )
        // отписываемся от прослушки истории
        return () => {
            unlisten()
        }
    }, [ userID ] ) // запускается при каждом изменении userID

    return <Profile/>
}

export default ProfileContainer
