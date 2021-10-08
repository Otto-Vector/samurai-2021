import React from "react";
import styles from './Socials.module.css'
import facebookFilled from '../../../assets/images/socials/filled/facebook-filled.png'
import githubFilled from '../../../assets/images/socials/filled/github-filled.png'
import instagramFilled from '../../../assets/images/socials/filled/instagram-filled.png'
import twitterFilled from '../../../assets/images/socials/filled/twitter-filled.png'
import vkFilled from '../../../assets/images/socials/filled/vk-filled.png'
import youtubeFilled from '../../../assets/images/socials/filled/youtube-filled.png'

import facebookEmpty from '../../../assets/images/socials/empty/facebook-empty.png'
import githubEmpty from '../../../assets/images/socials/empty/github-empty.png'
import instagramEmpty from '../../../assets/images/socials/empty/instagram-empty.png'
import twitterEmpty from '../../../assets/images/socials/empty/twitter-empty.png'
import vkEmpty from '../../../assets/images/socials/empty/vk-empty.png'
import youtubeEmpty from '../../../assets/images/socials/empty/youtube-empty.png'

const Socials = (props) => {

return (
  <div className={styles.socials}>
    <a target="_blank" rel="noopener noreferrer" href={props.facebook}>
        <img alt='fb' src={props.facebook ? facebookFilled : facebookEmpty}/>
    </a>
    <a target="_blank" rel="noopener noreferrer" href={props.github}>
        <img alt='git' src={props.github ? githubFilled : githubEmpty}/>
    </a>
    <a target="_blank" rel="noopener noreferrer" href={props.instagram}>
        <img alt='inst' src={props.instagram ? instagramFilled : instagramEmpty}/>
    </a>
    <a target="_blank" rel="noopener noreferrer" href={props.twitter}>
        <img alt='tw' src={props.twitter ? twitterFilled : twitterEmpty}/>
    </a>
    <a target="_blank" rel="noopener noreferrer" href={props.vk}>
        <img alt='vk' src={props.vk ? vkFilled : vkEmpty}/>
    </a>
    <a target="_blank" rel="noopener noreferrer" href={props.youtube}>
        <img alt='youtube' src={props.youtube ? youtubeFilled : youtubeEmpty}/>
    </a>
  </div>
)
}

export default Socials
