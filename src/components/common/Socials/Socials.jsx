import React from "react";
import styles from './Socials.module.css'
import {socialsImageSource} from "./SocialsImageSource";


const Socials = ({contacts}) => {

  return (
    <div className={styles.socials}>
      {Object.keys(contacts).map(key => {
          if (socialsImageSource.hasOwnProperty(key)) {
            let image = socialsImageSource[key][contacts[key] ? 'filled' : 'empty']
            return <a key={key} target="_blank" rel="noopener noreferrer" href={contacts[key]}>
              <img alt={key} title={key} src={image}/>
            </a>
          }
        })
      }
    </div>
  )

}

export default Socials
