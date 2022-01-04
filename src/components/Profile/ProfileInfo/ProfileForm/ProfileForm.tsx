import React, { useEffect } from 'react'
import styles from './ProfileForm.module.css'

import { Input, TextArea } from '../../../common/FormType/FormType'
import { Field, Form } from 'react-final-form'
import { composeValidators, required } from '../../../../utils/validators'
import { FORM_ERROR } from 'final-form'
import { socialsImageSource, SocialsImageSourceType } from '../../../common/Socials/SocialsImageSource'
import { ContactsType, ProfileType } from '../../../../redux/types/types'
import { ProfileThunkActionType } from '../../../../redux/profile-reducer'
import { errorParser } from '../../../../utils/utils'


type OwnProps = {
    initialValues: ProfileType | null
    onSubmit: ( data: ProfileType ) => ProfileThunkActionType<string[] | null> | Promise<string[] | null>
    // onSubmit: ( data: ProfileType ) => void
    onCancel: () => void
}

const ProfileForm: React.FC<OwnProps> = ( { initialValues, onSubmit, onCancel } ) => {

    // const error = useSelector( getErrorFromApi )


    if (initialValues === null) return null

    const { contacts } = initialValues

    const onSubmit1 = async ( formData: ProfileType ) => {
        const error = await onSubmit( formData )
        if (!error) {
            onCancel()
            return { [FORM_ERROR]: null }
        }
        let errors = errorParser( error as string[] )
        console.log(errors)
        return errorParser( error as string[] )
        // return error
    }

    const socialImageUrl = ( key: string ): string | undefined => {
        const hasImage = socialsImageSource[key as keyof SocialsImageSourceType]
        const hasHref = contacts[key as keyof ContactsType]
        return hasImage ? hasImage[hasHref ? 'filled' : 'empty'] : undefined
    }

    return (
        <Form
            onSubmit={ onSubmit1 }
            initialValues={ initialValues }
            render={
                ( { submitError, handleSubmit, form, submitting } ) => (
                    <form onSubmit={ handleSubmit }>
                        <div className={ styles.input }>
                            <Field name={ 'fullName' }
                                   placeholder={ 'fullName' }
                                   resetFieldBy={ form }
                                   component={ Input }
                                   validate={ composeValidators( required ) }
                            />
                        </div>
                        <div className={ styles.input }>
                            <Field name={ 'aboutMe' }
                                   component={ Input }
                                   placeholder={ 'aboutMe' }
                                   resetFieldBy={ form }
                                   validate={ composeValidators( required ) }
                            />
                        </div>
                        <div>
                            <label className={ styles.checkbox }>
                                <Field name={ 'lookingForAJob' }
                                       component={ 'input' }
                                       type={ 'checkbox' }
                                />
                                Looking for a Job
                            </label>
                        </div>
                        <div className={ styles.input }>
                            <Field name={ 'lookingForAJobDescription' }
                                   component={ TextArea }
                                   placeholder={ 'lookingForAJobDescription' }
                                   resetFieldBy={ form }
                                   validate={ composeValidators( required ) }
                            />
                        </div>
                        <div><b>CONTACTS</b></div>
                        { Object.keys( contacts ).map(
                            ( key ) => <div key={ key } className={ styles.socialInput }>
                                { socialsImageSource.hasOwnProperty( key ) &&
                                <img className={ styles.socialImage }
                                     alt={ key } title={ key }
                                     src={ socialImageUrl( key ) }/>
                                }
                                <Field name={ `contacts.${ key }` } component={ Input } placeholder={ key }
                                       resetFieldBy={ form }/>
                            </div> )
                        }

                        <button className={ styles.button }
                                type={ 'submit' }
                                disabled={ submitting }>Done
                        </button>
                        <button type={ 'button' }
                                className={ styles.button }
                                onClick={ onCancel }>Cancel
                        </button>
                        { submitError && <span className={ styles.onError }>{ submitError }</span> }
                    </form>
                )
            }/>
    )
}

export default ProfileForm
