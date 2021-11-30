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

export type EmptyFilledType = {
    empty: string
    filled: string
  }

export type SocialsImageSourceType = {
  facebook: EmptyFilledType
  github: EmptyFilledType
  instagram: EmptyFilledType
  twitter: EmptyFilledType
  vk: EmptyFilledType
  youtube: EmptyFilledType
}

export const socialsImageSource: SocialsImageSourceType = {
  facebook: {
    empty: facebookEmpty,
    filled: facebookFilled
  },
  github: {
    empty: githubEmpty,
    filled: githubFilled
  },
  instagram: {
    empty: instagramEmpty,
    filled: instagramFilled
  },
  twitter: {
    empty: twitterEmpty,
    filled: twitterFilled
  },
  vk: {
    empty: vkEmpty,
    filled: vkFilled
  },
  youtube: {
    empty: youtubeEmpty,
    filled: youtubeFilled
  }
}

// export type SocialsImageSourceType = typeof socialsImageSource
