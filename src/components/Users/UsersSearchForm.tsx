import React from 'react'
import styles from './Users.module.css'
import { Field, Form, Formik } from 'formik'
import { UsersFilter } from '../../redux/users-reducer'

type UsersSearchPropsType = {
    usersFilter: UsersFilter
    isFetching: boolean
    onTermChanged: ( values: UsersFilter ) => void
}


export const UserSearchForm: React.FC<UsersSearchPropsType> = (
    { onTermChanged, usersFilter, isFetching } ) => {

    const submit = async ( values: UsersFilter, { setSubmitting }: { setSubmitting: ( isSubmitting: boolean ) => void } ) => {

        onTermChanged( values )
        setSubmitting( true )
    }

    return <div className={ styles.searchFriendsField }>
        <Formik
            initialValues={ usersFilter }

            onSubmit={ submit }
        >
            { ( { dirty, handleReset } ) => (
                <Form>
                    <Field type="text" name={ 'userNameFilter' }/>
                    <Field name={ 'isFriendsFilter' } as={ 'select' }>
                        <option value='null'>All</option>
                        <option value='true'>Only Friends</option>
                        <option value='false'>Only unfollowed</option>
                    </Field>
                    <button type='submit' disabled={ isFetching }>
                        Find
                    </button>
                    <button type='reset' disabled={ !dirty } onClick={ handleReset }> -X-</button>
                </Form>
            ) }
        </Formik>
    </div>
}
