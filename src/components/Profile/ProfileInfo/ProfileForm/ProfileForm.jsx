import React from 'react';
import styles from './ProfileForm.module.css'

import {Input, TextArea} from "../../../common/FormType/FormType";
import {Field, Form} from "react-final-form";
import {composeValidators, required} from "../../../../utils/validators";
import {FORM_ERROR} from "final-form";
import {errorParser} from "../../../../utils/utils";
import {socialsImageSource} from "../../../common/Socials/SocialsImageSource";

const ProfileForm = props => {

  let {contacts} = props.initialValues

  let onSubmit = async formData => {
    let error = await props.onSubmit(formData)
    return error ? errorParser(error) : {[FORM_ERROR]: null}
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={props.initialValues}
      render={
        ({submitError, handleSubmit, form}) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.input}>
              <Field name={'fullName'}
                     placeholder={'fullName'}
                     resetFieldBy={form}
                     component={Input}
                     validate={composeValidators(required)}
              />
            </div>
            <div className={styles.input}>
              <Field name={'aboutMe'}
                     component={Input}
                     placeholder={'aboutMe'}
                     resetFieldBy={form}
                // validate={composeValidators(required)}
              />
            </div>
            <div>
              <label className={styles.checkbox}>
                <Field name={'lookingForAJob'}
                       component={'input'}
                       type={'checkbox'}
                />
                Looking for a Job
              </label>
            </div>
            <div className={styles.input}>
              <Field name={'lookingForAJobDescription'}
                     component={TextArea}
                     placeholder={'lookingForAJobDescription'}
                     resetFieldBy={form}
                     validate={composeValidators(required)}
              />
            </div>
            <div>CONTACTS</div>
            {Object.keys(contacts).map(key => <div key={key} className={styles.socialInput}>
              {socialsImageSource.hasOwnProperty(key) &&
              <img className={styles.socialImage}
                   alt={key} title={key}
                   src={socialsImageSource[key][contacts[key] ? 'filled' : 'empty']}/>
              }
              <Field name={`contacts.${key}`} component={Input} placeholder={key} resetFieldBy={form}/>
            </div>)
            }

            <button className={styles.button} type={'submit'}>Done</button>
            <button type={'button'}
                    className={styles.button}
                    onClick={props.onCancel}>Cancel
            </button>
            {submitError && <span className={styles.onError}>{submitError}</span>}
          </form>
        )
      }/>
  )
}

export default ProfileForm
