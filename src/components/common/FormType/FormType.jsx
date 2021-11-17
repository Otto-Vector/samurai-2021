import React from "react";
import styles from "./FormType.module.css"

const FormType = FormType => ({input, meta, form, placeholder}) => {

  const error = meta.error || meta.submitError
  const boolError = error && meta.touched
  return (<div className={styles.wrapper + ' ' + (boolError && styles.error)}>
      <FormType
        {...input}
        className={styles.textarea}
        placeholder={placeholder}
      />
    {meta.visited && form && <button type={'reset'}
              className={styles.resetButton}
              onClick={() => {
                form.change(input.name, '')
                form.resetFieldState(input.name)
              }}>
      </button>}
      {boolError && (<span className={styles.span}>{error}</span>)}
    </div>
  )
}

export const TextArea = FormType('textarea')
export const Input = FormType('input')
