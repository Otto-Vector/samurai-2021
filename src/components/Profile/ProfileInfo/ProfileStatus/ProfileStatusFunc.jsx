import React, {useState} from 'react';
import styles from './ProfileStatus.module.css'
import Preloader from "../../../common/Preloader/Preloader";


const StatusChangeForm = props => {

  return <div >
          <textarea className={styles.pStatusTextInput}
                    placeholder={props.placeholder}
                    autoFocus={true}
                    value={props.value}
                    onChange={props.onChange}
                    onKeyDown={props.onKeyDown}
                    onBlur={props.onBlur}
          />
  </div>;
}


const ProfileStatusFunc = props => {

  let [status, setStatus] = useState(props.profileStatusText || '')
  let [editMode, setEditMode] = useState(false)

  const enableEditMode = () => {
    setEditMode(props.isAuthProfile)
  }

  const disableEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
  }

  const onStatusInput = e => {
   setStatus(e.currentTarget.value)
  }

  if (props.profileStatusFetching) return <Preloader/>

    return <div className={styles.pStatus}>

      {!editMode &&
      <div className={styles.pStatusText}
           onDoubleClick={enableEditMode}>
        <span>{props.profileStatusText || 'no status'}</span>
      </div>
      }
      {editMode &&
      <StatusChangeForm placeholder={props.profileStatusPlaceholder}
                        value={status}
                        onChange={onStatusInput}
                        onKeyDown={e => {
                          if (e.key === 'Enter') disableEditMode()
                        }}
                        onBlur={disableEditMode}/>
      }
    </div>
}

export default ProfileStatusFunc
