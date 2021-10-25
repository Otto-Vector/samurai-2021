import React from 'react';
import s from './Message.module.css';
import noImage from '../../../assets/images/userNoImage.png'

const Message = (props) => {
    return <div className={s.messageWrapper}>
            {/*<img className={s.image} src={props.image} alt=''></img>*/}
            <img className={s.image} src={noImage} alt=''></img>
            <div className={s.message}>{props.message}</div>
           </div>
}

export default Message;
