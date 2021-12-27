import React, { ChangeEvent, useState } from 'react'
import styles from './ProfileStatus.module.css'
import Preloader from '../../../common/Preloader/Preloader'
import { ProfileStatusProps } from './ProfileStatusContainer'
import StatusChangeForm from './ProfileStatusForm'


const ProfileStatus: React.FC<ProfileStatusProps> = (
    {
        profileStatusText, profileStatusPlaceholder, profileStatusFetching,
        isAuthProfile, updateStatus,
    } ) => {

    const [ status, setStatus ] = useState( profileStatusText || '' )
    const [ editMode, setEditMode ] = useState( false )

    const enableEditMode = () => {
        setEditMode( isAuthProfile )
    }

    const disableEditMode = () => {
        setEditMode( false )
        updateStatus( status )
    }

    const onStatusInput = ( event: ChangeEvent<HTMLTextAreaElement> ) => {
        setStatus( event.currentTarget.value )
    }

    const onKeyDownEnter = ( event: React.KeyboardEvent<HTMLTextAreaElement> ) => {
        if (event.key === 'Enter') disableEditMode()
    }

    if (profileStatusFetching) return <Preloader/>

    return <div className={ styles.pStatus }>

        { !editMode &&
        <div className={ styles.pStatusText }
             onDoubleClick={ enableEditMode }>
          <span>{ profileStatusText || 'no status' }</span>
        </div>
        }
        { editMode &&
        <StatusChangeForm placeholder={ profileStatusPlaceholder }
                          value={ status }
                          onChangeStatus={ onStatusInput }
                          onKeyDownEnter={ onKeyDownEnter }
                          onBlurDisable={ disableEditMode }/>
        }
    </div>
}

export default ProfileStatus
