import React from "react";
import styles from "./FormType.module.css"
import {FieldProps, FormProps} from "react-final-form";

type TFormType = {
    resetFieldBy: FormProps['form']
    placeholder: string
}

const FormType = (FormType: string) => ({input, meta, resetFieldBy, placeholder}: any) => {

  const error = meta.error || meta.submitError
  const boolError = error && meta.touched

  return (<div className={styles.wrapper + ' ' + (boolError && styles.error)+' '+(meta.active && styles.active)}>
      <FormType
        {...input}
        className={styles.textarea}
        placeholder={placeholder}
      />
      {/*кнопка для сброса параметров поля
      (проявляется, если переданы методы resetFieldBy={form} в объявленном объекте Field*/}
    {meta.visited && resetFieldBy && <div
              className={styles.resetButton}
              onClick={() => {
                resetFieldBy.change(input.name, '')
                resetFieldBy.resetFieldState(input.name)
              }}
    >
      </div>}
      {/*сообщение об ошибке появляется в этом спане*/}
      {boolError && (<span className={styles.span}>{error}</span>)}
    </div>
  )
}

export const TextArea = FormType('textarea')
export const Input = FormType('input')
