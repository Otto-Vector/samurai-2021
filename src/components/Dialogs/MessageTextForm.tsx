import React from "react";
import styles from './Dialogs.module.css';

import {Form, Field} from 'react-final-form'
import {TextArea} from "../common/FormType/FormType";

import {composeValidators, required} from "../../utils/validators";
import {onAltEnterKey} from "../../utils/KeyListeners";
import {MessagesType} from "../../redux/types/types";
import {FormApi} from "final-form";

type OwnProps = {
  textMessagePlaceholder: string
  onSubmit: (formData: MessagesType) => void
}

const MessageTextForm: React.FC<OwnProps> = ({textMessagePlaceholder, onSubmit}) => {

  // передача значений со сбросом поля ввода
    const onSubmitResetForm = (formData: MessagesType, form: FormApi<MessagesType>)=>{
      onSubmit(formData)
      //сброс значений после ввода
      form.reset()
    }

  return (
    <div className={styles.addField}>
      <Form
        onSubmit={onSubmitResetForm}
        initialValues={{
          message: ''
        }}
        render=
          {({handleSubmit, pristine, form, submitting, values }) => (
            <form className={styles.addField} onSubmit={handleSubmit}>
              <div className={styles.textarea}
                   onKeyDown={(e) => {onAltEnterKey(e)(form.submit)}}
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
