import React from 'react'
import styles from './Users.module.css'
import { Field, Form, Formik } from 'formik'

type UserSearchObjectType = {
    term: string
}
export const UserSearchForm: React.FC = ( props ) => {

    const submit = ( values: UserSearchObjectType, { setSubmitting }: { setSubmitting: ( isSubmitting: boolean ) => void } ) => {
        setTimeout( () => {
            alert( JSON.stringify( values, null, 2 ) )
            setSubmitting( false )
        }, 400 )
    }

    return <div className={ styles.searchFriendsField }>
        <Formik
            initialValues={ { term: '' } }

            onSubmit={ submit }
        >
            { ( { isSubmitting } ) => (
                <Form>
                    <Field type="text" name="term"/>

                    <button type="submit" disabled={ isSubmitting }>
                        Find
                    </button>
                </Form>
            ) }
        </Formik>
    </div>
}
