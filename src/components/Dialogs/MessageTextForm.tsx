import React from "react";
import styles from './Dialogs.module.css';

import {Form, Field} from 'react-final-form'
import {TextArea} from "../common/FormType/FormType";

import {composeValidators, required} from "../../utils/validators";
import {onAltEnterKey} from "../../utils/KeyListeners";
import {MessagesType} from "../../redux/types/types";

type OwnProps = {
  textMessagePlaceholder: string
  // onSubmit: ()=> Promise<void>
  onSubmit: (formData: MessagesType, form: any) => void
}

const MessageTextForm = ({textMessagePlaceholder, onSubmit}: OwnProps) => {


  return (
    <div className={styles.addField}>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          message: ''
        }}
        render=
          {({handleSubmit, pristine, form, submitting, values }) => (
            <form className={styles.addField} onSubmit={handleSubmit}>
              <div className={styles.textarea}
                   onKeyDown={e => {onAltEnterKey(e)(form.submit)}}
              >
                <Field name={'message'}
                       validate={composeValidators(required)}
                       placeholder={textMessagePlaceholder}
                       component={TextArea}
                />
              </div>
              <div className={styles.buttonsWrapper}>
                <button type={'submit'}
                        className={styles.button}
                        disabled={submitting}
                >Add message
                </button>
                <button type={'button'}
                        className={styles.resetButton}
                        disabled={pristine || submitting}
                        onClick={(e)=>{form.reset()}}
                >X
                </button>
              </div>
            </form>
          )}
      />
    </div>
  )
}

export default MessageTextForm
