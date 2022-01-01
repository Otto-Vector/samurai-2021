import React from 'react'
import styles from './Users.module.css'
import { Field, Form, Formik } from 'formik'

type UsersSearchPropsType = {
    userNameFilter: string | undefined
    onTermChanged: ( term: string | undefined ) => void
}

type UserSearchObjectType = {
    term: string | undefined
}

export const UserSearchForm: React.FC<UsersSearchPropsType> = ( { onTermChanged, userNameFilter } ) => {

    const submit = async ( values: UserSearchObjectType, { setSubmitting }: { setSubmitting: ( isSubmitting: boolean ) => void } ) => {

            await onTermChanged( values.term )
            setSubmitting( false )

    }

    return <div className={ styles.searchFriendsField }>
        <Formik
            initialValues={ { term: userNameFilter } }

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
