import React from 'react'
import styles from './Users.module.css'
import { UsersFilter } from '../../redux/users-reducer'
import { Input } from '../common/FormType/FormType'
import { Field, Form } from 'react-final-form'

type UsersSearchPropsType = {
    usersFilter: UsersFilter
    isFetching: boolean
    onTermChanged: ( values: UsersFilter ) => void
}


export const UserSearchForm: React.FC<UsersSearchPropsType> = (
    { onTermChanged, usersFilter, isFetching } ) => {

    const resetClear: UsersFilter = { userNameFilter: '', isFriendsFilter: null }

    const submit = async ( values: UsersFilter ) => {
        await onTermChanged( values )
    }

    return <div className={ styles.searchFriendsField }>
        <Form
            onSubmit={ submit }
            initialValues={ usersFilter }
            render={
                ( { submitError, handleSubmit, form, submitting, dirty } ) => (
                    <form onSubmit={ handleSubmit }>
                        <div className={ styles.input }>
                            <Field name={ 'userNameFilter' }
                                   placeholder={ 'userName' }
                                   resetFieldBy={ form }
                                   component={ Input }
                            />
                        </div>
                        <div>
                            <span className={ styles.select }>
                                <Field name={ 'isFriendsFilter' } component={ 'select' }>
                                    <option value='null'>All</option>
                                    <option value='true'>Only Friends</option>
                                    <option value='false'>Only unfollowed</option>
                                </Field>
                            </span>
                            <button className={ styles.button }
                                    type={ 'submit' }
                                    disabled={ submitting }>Done
                            </button>
                            <button type={ 'reset' }
                                    className={ styles.button }
                                    disabled={ !dirty || submitting }
                                    onClick={ () => {
                                        form.reset( resetClear )
                                    } }> X
                            </button>
                        </div>
                        { submitError && <span className={ styles.onError }>{ submitError }</span> }
                    </form>
                )
            }/>
    </div>
}
