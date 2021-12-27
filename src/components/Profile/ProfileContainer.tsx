import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import Profile from './Profile'
import {
    getProfile,
    setPhoto,
    setProfileData,
    getStatus,
    ProfileThunkActionType,
    profileActions, followProfile,
} from '../../redux/profile-reducer'
import { getAuthorizedUserDataId, getIsAuthUser } from '../../reselect/auth-reselectors'
import {
    getIsFollowCurrent, getIsFollowFetching,
    getProfileData,
    getProfileIsAuth,
    getProfileIsFetching,
} from '../../reselect/profile-selectors'
import { ProfileType } from '../../redux/types/types'
import { AppStateType } from '../../redux/redux-store'

type MapStatePropsType = {
    isAuth: boolean
    authUserId: number | null
    profile: ProfileType | null
    isFetching: boolean
    isAuthProfile: boolean
    isFollowCurrent: boolean
    isFollowFetching: boolean
}

type MapDispatchType = {
    getProfile: ( userId: number ) => void
    setIsAuthProfile: ( isAuthProfile: boolean ) => void
    getStatus: ( userId: number ) => void
    setPhoto: ( userPhoto: File ) => void
    setProfileData: ( data: ProfileType ) => ProfileThunkActionType<string[] | null> | Promise<string[] | null>
    followProfile: ( isFollow: boolean, userId: number ) => void
}

type OwnProps = {
    // unlisten: any
}

type RouteProps = {
    userId?: string
}

type ProfileContainerType = MapStatePropsType & MapDispatchType & OwnProps & RouteComponentProps<RouteProps>

const ProfileContainer: React.FC<ProfileContainerType> = (
    { // state переменные
        authUserId, profile, isAuthProfile, isFetching,
        isFollowCurrent, isFollowFetching,
        // BLL actions
        setPhoto, setProfileData, setIsAuthProfile, getProfile, getStatus, followProfile,
        // withRouter
        history, match: { params },
    } ) => {

    // присваиваем первое значение из роутера
    // и меняем пользователя внутри компоненты, пока она живёт
    const [ userID, changeUserID ] = useState( +(params.userId || 0) )


    // const hist_ory = useHistory()
    // по умолчанию, всегда берёт активный userID
    const updateProfile = ( idFromRouter = userID ) => {

        const _userId = idFromRouter || +(authUserId || 0)

        setIsAuthProfile( _userId === +(authUserId || 0) )
        getProfile( _userId )
        getStatus( _userId )

    }

    useEffect( () => {
        // console.log('params: ',params);
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

    return (<Profile profile={ profile }
                     isAuthProfile={ isAuthProfile }
                     isFetching={ isFetching }
                     isFollowCurrent={ isFollowCurrent }
                     setPhoto={ setPhoto }
                     setProfileData={ setProfileData }
                     followProfile={ followProfile }
                     isFollowFetching={ isFollowFetching }
    />)

}

const mapStateToProps = ( state: AppStateType ): MapStatePropsType => {
    return {
        isAuth: getIsAuthUser( state ),
        authUserId: getAuthorizedUserDataId( state ),
        profile: getProfileData( state ),
        isFetching: getProfileIsFetching( state ),
        isAuthProfile: getProfileIsAuth( state ),
        isFollowCurrent: getIsFollowCurrent( state ),
        isFollowFetching: getIsFollowFetching( state ),
    }
}

const { setIsAuthProfile } = profileActions

export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchType, OwnProps, AppStateType>( mapStateToProps, {
        getProfile,
        setIsAuthProfile,
        getStatus,
        setPhoto,
        setProfileData,
        followProfile,
    } ),
    // withAuthRedirect,
    withRouter,
)( ProfileContainer )
