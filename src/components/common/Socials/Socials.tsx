import React from "react";
import styles from './Socials.module.css'
import {socialsImageSource} from "./SocialsImageSource";
import {ContactsType} from "../../../redux/types/types";

type OwnProps = {
  contacts: ContactsType
}


const Socials: React.FC<OwnProps> = ({contacts}) => {

  return (
    <div className={styles.socials}>
      {Object.keys(contacts).map((key) => {
          if (socialsImageSource.hasOwnProperty(key)) {
            let image = Object(socialsImageSource).getProperty(key).filled
            let urlImage = Object(contacts).hasOwnProperty(key) ? image.filled : image.empty

            return <a key={key} target="_blank" rel="noopener noreferrer" href={Object(contacts).getProperty(key)}>
              <img alt={key} title={key} src={urlImage}/>
            </a>
          }
          return null
        })
      }
    </div>
  )

}

export default Socials
