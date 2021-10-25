import React from 'react';
import styles from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Form, Field} from 'react-final-form'
import {composeValidators, required} from "../../utils/validators";
import {TextArea} from "../common/TextArea/TextArea";


const MessageTextForm = (props) => {

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
              <div className={styles.textarea}>
                <Field name={'message'}
                       validate={composeValidators(required)}
                       placeholder={props.textMessagePlaceholder}
                       type={'text'}
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

// const MessageTextReduxForm = reduxForm({form: 'messageText'})(MessageTextForm)

const Dialogs = (props) => {

  let onSubmit = (formData) => {
    props.addMessage(formData.message)
    // props.reset('messageText')
  }

  // //считываем alt+Enter(13) для добавления ссобщения
  // let onkey = (event) => {
  //   if (event.keyCode === 13 && event.altKey) {
  //     props.addMessage()
  //   }
  // }

  //хардкодим сопоставление иконок айдишникам
  let zz = (idd) => {
    for (let {id, imageURL} of props.dialogs)
      if (id === +idd) return imageURL
  }


  let dialogsElements = props.dialogs.map(args => <DialogItem {...args} key={Math.random().toString()}/>)
  let messagesElements = props.messages.map(
    args => <Message {...args} key={Math.random().toString()} image={zz(args.id)}/>)

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogsItems}>
        {dialogsElements}
      </div>

      <div className={styles.messagesField}>
        <div className={styles.messages}>
          {messagesElements}
        </div>
        <MessageTextForm onSubmit={onSubmit} textMessagePlaceholder={props.textMessagePlaceholder}/>
      </div>
    </div>
  )
}

export default Dialogs;
