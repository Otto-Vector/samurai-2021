import React, { ChangeEvent } from 'react'
import styles from './ProfileStatus.module.css'

type StatusChangeFormType = {
    placeholder?: string
    value: string
    onChangeStatus: ( event: ChangeEvent<HTMLTextAreaElement> ) => void
    onKeyDownEnter: ( event: React.KeyboardEvent<HTMLTextAreaElement> ) => void
    onBlurDisable: () => void
}

const StatusChangeForm: React.FC<StatusChangeFormType> = (
    { placeholder, value, onChangeStatus, onKeyDownEnter, onBlurDisable } ) => {

    return <div>
          <textarea className={ styles.pStatusTextInput }
                    placeholder={ placeholder }
                    autoFocus={ true }
                    value={ value }
                    onChange={ onChangeStatus }
                    onKeyDown={ onKeyDownEnter }
                    onBlur={ onBlurDisable }
          />
    </div>
}

export default StatusChangeForm
