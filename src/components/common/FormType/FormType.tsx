import React from "react";
import styles from "./FormType.module.css"
import {FieldState, FormApi} from "final-form";

type OwnProps = {
  form: FormApi
  placeholder?: string
  meta: FieldState<any>
  input: any
}


const FormType = (FormType: string): React.FC<OwnProps> =>
  ({ input,
     meta: {error: metaError, submitError, touched, visited, active},
     form, placeholder}) => {

  const error = metaError || submitError
  const boolError = error && touched

  return (<div className={ styles.wrapper + ' ' + (boolError && styles.error) + ' ' + (active && styles.active) }>
      <FormType
        { ...input }
        className={ styles.textarea }
        placeholder={ placeholder }
      />
      {/*кнопка для сброса параметров поля
      (проявляется, если переданы методы resetFieldBy={form} в объявленном объекте Field*/ }
      { visited && form && <div
        className={ styles.resetButton }
        onClick={ () => {
          form.change(input.name, '')
          form.resetFieldState(input.name)
        } }
      >
      </div> }
      {/*сообщение об ошибке появляется в этом спане*/ }
      { boolError && (<span className={ styles.span }>{ error }</span>) }
    </div>
  )
}

export const TextArea = FormType('textarea')
export const Input = FormType('input')
