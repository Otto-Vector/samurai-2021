import React from 'react';
import styles from './DialogItem.module.css';
import {NavLink} from "react-router-dom";
import noImage from '../../../assets/images/userNoImage.png'
import {DialogsType} from "../../../redux/types/types";

const DialogItem: React.FC<DialogsType> = ({id, name}) => {
    const path = "/dialogs/" + id;

    return <div className={styles.dialog}>
            {/*<img className={styles.image} alt="dialogImage" src={props.imageURL}/>*/}
            <img className={styles.image} alt="dialogImage" src={noImage}/>
            <NavLink to={path} className={styles.profileName} activeClassName={styles.active}>{name}</NavLink>
        </div>
}

export default DialogItem;
