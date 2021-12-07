import React from "react";
import styles from './Socials.module.css'
import {socialsImageSource, SocialsImageSourceType} from "./SocialsImageSource";
import {ContactsType} from "../../../redux/types/types";

type OwnProps = {
  contacts: ContactsType | undefined
}

const Socials = ({contacts}: OwnProps) => {
  // защита от undefined входящего элемента
  if (contacts === undefined) return null
  // фильтруем contacts в массив ключей, присутствующих в socialsImageSource
  const filteredBySource = Object.keys(contacts)
    .filter((key) => socialsImageSource.hasOwnProperty(key))

  return (
    <div className={ styles.socials }>
      { filteredBySource.map((key) => {

        let image = socialsImageSource[key as keyof SocialsImageSourceType],
        hasHref = contacts[key as keyof ContactsType] || undefined,
        imageUrl = image ? image[hasHref ? 'filled' : 'empty'] : undefined

        return <a key={ key } target="_blank" rel="noopener noreferrer" href={ hasHref }>
          <img alt={ key } title={ key } src={ imageUrl }/>
        </a>
      })
      }
    </div>
  )

}

export default Socials
