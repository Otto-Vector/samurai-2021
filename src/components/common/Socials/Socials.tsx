import React from "react";
import styles from './Socials.module.css'
import {socialsImageSource, SocialsImageSourceType} from "./SocialsImageSource";
import {ContactsType} from "../../../redux/types/types";

type OwnProps = {
  contacts: ContactsType | undefined
}

const Socials = ({contacts}: OwnProps) => {

  if (contacts === undefined) return null

  const filteredBySource = Object.keys(contacts)
    .filter((key) => socialsImageSource.hasOwnProperty(key))

  return (
    <div className={ styles.socials }>
      { filteredBySource.map((key: string) => {
        // let image = socialsImageSource[key][contacts[key] ? 'filled' : 'empty']
        let image = socialsImageSource[key as keyof SocialsImageSourceType],
        hasHref = contacts[key as keyof ContactsType],
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
