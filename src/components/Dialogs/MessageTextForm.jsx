import React from "react";
import styles from './Dialogs.module.css';

import {Form, Field} from 'react-final-form'
import {TextArea} from "../common/FormType/FormType";

import {composeValidators, required} from "../../utils/validators";
import {onAltEnterKey} from "../../utils/KeyListeners";


const MessageTextForm = props => {

  return (
    <div className={styles.addField}>
      <Form
        onSubmit={props.onSubmit}
        initialValues={{
          message: ''
        }}
        render=
          {({handleSubmit, pristine, form, submitting, values}) => (
            <form className={styles.addField} onSubmit={handleSubmit}>
              <div className={styles.textarea}
                   onKeyDown={e => {onAltEnterKey(e)(form.submit)}}

              >
                <Field name={'message'}
                       validate={composeValidators(required)}
                       placeholder={props.textMessagePlaceholder}
                       component={TextArea}

                />
              </div>
              <div className={styles.buttonsWrapper}>
                <button type={'submit'}
                        className={styles.button}>Add message
                </button>
                <button type={'button'}
                        className={styles.resetButton}
                        disabled={pristine || submitting}
                        onClick={form.reset}>X
                </button>
              </div>
            </form>
          )}
      />
    </div>
  )
}

export default MessageTextForm
