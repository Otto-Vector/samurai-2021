import React from 'react'
import styles from './Users.module.css'
import { Field, Form, Formik } from 'formik'
import { getUsersType } from '../../api/users-api'

type UsersSearchPropsType = {
    isFriendsFilter: boolean | null
    userNameFilter: string | undefined
    getUsers: ( getUsersOption: getUsersType ) => void
}

type UserSearchObjectType = {
    term: string | undefined
}

export const UserSearchForm: React.FC<UsersSearchPropsType> = ( { getUsers, userNameFilter, isFriendsFilter } ) => {

    const submit = async ( values: UserSearchObjectType, { setSubmitting }: { setSubmitting: ( isSubmitting: boolean ) => void } ) => {

            await getUsers( {page: 1, userName: values.term, pageSize: 4, isFriendsFilter} )
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
