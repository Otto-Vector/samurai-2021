import React from 'react';
import styles from './Message.module.css';
import noImage from '../../../assets/images/userNoImage.png'
import {MessagesType} from "../../../redux/types/types";

type OwnProps = {
  image: string | undefined
}

type MessageComponentType = MessagesType & OwnProps

const Message: React.FC<MessageComponentType> = ({message}) => {
    return <div className={styles.messageWrapper}>
            {/*<img className={styles.image} src={props.image} alt=''></img>*/}
            <img className={styles.image} src={noImage} alt='User' />
            <div className={styles.message}>{message}</div>
           </div>
}

export default Message;
