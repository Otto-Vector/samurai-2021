import React from "react";
import styles from "./TextArea.module.css"

export const TextArea = ({input, meta, placeholder, type}) => {

  let boolError = (meta.error && meta.touched)

  return (<div className={styles.wrapper}>
                  <input
                    {...input}
                    type = {type}
                    className={styles.textarea + ' ' + (boolError && styles.error)}
                    placeholder={placeholder}
                  />
                    {boolError && <span className={styles.span}>{meta.error}</span>}
                  </div>
                )
}
