import React from 'react'
import styles from './Users.module.css'
import { UsersFilterType } from '../../redux/users-reducer'
import { Input } from '../common/FormType/FormType'
import { Field, Form } from 'react-final-form'

type UsersSearchPropsType = {
    usersFilter: UsersFilterType
    isFetching: boolean
    onTermChanged: ( values: UsersFilterType ) => void
}


export const UserSearchForm: React.FC<UsersSearchPropsType> = (
    { onTermChanged, usersFilter, isFetching } ) => {

    const resetClear: UsersFilterType = {
        userName: '',
        isFriends: null,
        pageSize: usersFilter.pageSize,
        currentPage: usersFilter.currentPage
    }

    const submit = async ( values: UsersFilterType ) => {
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
                            <Field name={ 'userName' }
                                   placeholder={ 'userName' }
                                   resetFieldBy={ form }
                                   component={ Input }
                            />
                        </div>
                        <div>
                            <span className={ styles.select }>
                                <Field name={ 'isFriends' } component={ 'select' }>
                                    <option value='null'>All</option>
                                    <option value='true'>Only Friends</option>
                                    <option value='false'>Only unfollowed</option>
                                </Field>
                            </span>
                            <button className={ styles.button }
                                    type={ 'submit' }
                                    disabled={ submitting || isFetching }>Done
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
