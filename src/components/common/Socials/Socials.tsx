import React from "react";
import styles from './Socials.module.css'
import {socialsImageSource} from "./SocialsImageSource";
import {ContactsType} from "../../../redux/types/types";

type OwnProps = {
  contacts: ContactsType
}


const Socials = ({contacts}: OwnProps) => {

  const filteredBySource = Object.keys(contacts).filter((key) => socialsImageSource.hasOwnProperty(key))

  return (
    <div className={ styles.socials }>
      { filteredBySource.map((key: string) => {
        // @ts-ignore
        let image = socialsImageSource[key][contacts[key] ? 'filled' : 'empty']
        // @ts-ignore
        return <a key={ key } target="_blank" rel="noopener noreferrer" href={ contacts[key] }>
          <img alt={ key } title={ key } src={ image }/>
        </a>
      })
      }
    </div>
  )

}

export default Socials
