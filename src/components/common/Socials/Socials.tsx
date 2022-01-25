import React from 'react'
import styles from './Socials.module.css'
import { socialsImageSource, SocialsImageSourceType } from './SocialsImageSource'
import { ContactsType } from '../../../redux/types/types'

type OwnProps = {
    contacts: ContactsType | undefined
}

const Socials: React.FC<OwnProps> = ( { contacts } ) => {
    // защита от undefined входящего элемента
    if (contacts === undefined) return null


    // фильтруем contacts в массив ключей, присутствующих в socialsImageSource
    const filteredBySource = Object.keys( contacts )
        .filter( ( key ) => socialsImageSource.hasOwnProperty( key ) )
    //делаем то же самое с ключами types
    type HasOwnKeysType = Extract<keyof ContactsType, keyof SocialsImageSourceType>

    return (
        <div className={ styles.socials }>
            { filteredBySource.map( ( key ) => {
                let image = socialsImageSource[key as HasOwnKeysType],
                    hrefIs = contacts[key as HasOwnKeysType] || undefined,
                    imageUrl = image ? image[hrefIs ? 'filled' : 'empty'] : undefined

                return <a key={ key } target="_blank" rel="noopener noreferrer" href={ hrefIs }>
                    <img alt={ key } title={ key } src={ imageUrl }/>
                </a>
            } )
            }
        </div>
    )
}

export default Socials
