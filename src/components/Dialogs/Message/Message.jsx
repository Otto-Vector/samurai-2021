import React from 'react';
import styles from './Message.module.css';
import noImage from '../../../assets/images/userNoImage.png'

const Message = (props) => {
    return <div className={styles.messageWrapper}>
            {/*<img className={styles.image} src={props.image} alt=''></img>*/}
            <img className={styles.image} src={noImage} alt=''></img>
            <div className={styles.message}>{props.message}</div>
           </div>
}

export default Message;
