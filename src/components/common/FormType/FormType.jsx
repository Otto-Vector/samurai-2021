import React from "react";
import styles from "./FormType.module.css"

const FormType = (Formtype) => ({input, meta, placeholder}) => {
  let boolError = (meta.error && meta.touched)
  return (<div className={styles.wrapper+ ' ' + (boolError && styles.error)}>
                  <Formtype
                    {...input}
                    className={styles.textarea}
                    placeholder={placeholder}
                  />
                    {boolError && <span className={styles.span}>{meta.error}</span>}
                  </div>
                )
}

export const TextArea = FormType('textarea')
export const Input = FormType('input')
